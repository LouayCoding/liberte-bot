const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const User = require('../../models/userModel'); // Importeer je Mongoose User-model
const fetch = require('node-fetch');

const COINMARKETCAP_API_KEY = '90cadb2e-e4a7-4749-9361-1cf883d2d770';

async function getCoinPrice(coinSymbol) {
    try {
        const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coinSymbol}`, {
            headers: {
                'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
            },
        });
        const data = await response.json();
        const priceUSD = data.data[coinSymbol].quote.USD.price;
        return priceUSD;
    } catch (error) {
        console.error('Fout bij het ophalen van prijsinformatie:', error);
        return null;
    }
}

module.exports = {
    name: 'sell',
    description: 'Verkoop je virtuele activa en geef het verschil in waarde weer.',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'coin',
            description: 'De cryptocurrency die je wilt verkopen (gebruik de afkorting, zoals BTC).',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'bedrag',
            description: 'Het aantal virtuele munten dat je wilt verkopen.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const { options, user } = interaction;
        const coinSymbol = options.getString('coin').toUpperCase();
        const amountToSellString = options.getString('bedrag');
        
        // Probeer het bedrag om te zetten naar een nummer (float)
        const amountToSell = parseFloat(amountToSellString);

        if (isNaN(amountToSell) || amountToSell <= 0) {
            interaction.reply('Ongeldige verkoopwaarde.');
            return;
        }

        const coinPrice = await getCoinPrice(coinSymbol);

        if (!coinPrice) {
            interaction.reply('Kon de prijs van de opgegeven cryptocurrency niet ophalen.');
            return;
        }

        let userData = await User.findOne({ userId: user.id });

        if (!userData) {
            interaction.reply('Je hebt nog geen balans.');
            return;
        }

        const coinIndex = userData.coins.findIndex(coin => coin.symbol === coinSymbol);

        if (coinIndex === -1 || userData.coins[coinIndex].balance < amountToSell) {
            const userCoinBalance = coinIndex !== -1 ? userData.coins[coinIndex].balance : 0;
            interaction.reply(`Je hebt niet genoeg ${coinSymbol} munten om ${amountToSell} te verkopen. Je hebt ${userCoinBalance} ${coinSymbol} munten beschikbaar.`);
            return;
        }

        // Bereken de totale verkoopwaarde
        const totalSaleValue = amountToSell * coinPrice;

        // Trek het aantal verkochte virtuele munten af van de gebruikersbalans
        userData.coins[coinIndex].balance -= amountToSell;

        if (userData.coins[coinIndex].balance === 0) {
            // Verwijder de cryptocurrency uit de array als de balans nul is
            userData.coins.splice(coinIndex, 1);
        }

        // Voeg het bedrag dat wordt verdiend met de verkoop toe aan de gebruikersbalans
        userData.balance += totalSaleValue;

        await userData.save();

        interaction.reply(`Je hebt ${amountToSell} ${coinSymbol} verkocht voor $${totalSaleValue.toFixed(2)}. Je hebt nu $${userData.balance.toFixed(2)} op je balans.`);
    },
};