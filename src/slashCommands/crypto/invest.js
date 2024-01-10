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
    name: 'invest',
    description: 'Investeer nepgeld in een virtueel actief.',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'coin',
            description: 'De cryptocurrency waarin je wilt investeren (gebruik de afkorting, zoals BTC).',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'bedrag',
            description: 'Het bedrag dat je wilt investeren.',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const { options, user } = interaction;
        const coinSymbol = options.getString('coin').toUpperCase();
        const amountToInvest = options.getInteger('bedrag');


        if (isNaN(amountToInvest) || amountToInvest <= 0) {
            interaction.reply({ content: 'Ongeldige investeringswaarde.', ephemeral: true });
            return;
        }

        const coinPrice = await getCoinPrice(coinSymbol);

        if (!coinPrice) {
            interaction.reply({ content: 'Kon de prijs van de opgegeven cryptocurrency niet ophalen.', ephemeral: true });
            return;
        }

        let userData = await User.findOne({ userId: user.id });

        
        if (!userData) {
            console.log('sss')
            userData = new User({ userId: user.id, coins: [], balance: 0 }); // Voeg 'balance' toe aan de gebruikersgegevens
            return await userData.save();
        }

        if (userData.balance < amountToInvest) {
            interaction.reply({ content: 'Je hebt niet genoeg saldo om deze investering te maken.', epemeral: true });
            return;
        }

        // Bereken het aantal virtuele munten op basis van de prijs en rond het af naar 2 decimalen
        const coinsPurchased = parseFloat((amountToInvest / coinPrice).toFixed(2));

        // Voeg de cryptocurrency en afgeronde balans toe aan de gebruikersarray
        const existingCoinIndex = userData.coins.findIndex(coin => coin.symbol === coinSymbol);
        if (existingCoinIndex !== -1) {
            userData.coins[existingCoinIndex].balance = parseFloat((userData.coins[existingCoinIndex].balance + coinsPurchased).toFixed(2));
        } else {
            userData.coins.push({ symbol: coinSymbol, balance: coinsPurchased });
        }

        // Rond het geïnvesteerde bedrag af naar 2 decimalen en trek het af van de balans
        userData.balance = parseFloat((userData.balance - amountToInvest).toFixed(2));

        await userData.save();

        interaction.reply(`Je hebt $${amountToInvest} geïnvesteerd in ${coinSymbol} en hebt ${coinsPurchased.toFixed(6)} ${coinSymbol} munten ontvangen. Je hebt nu $${userData.balance.toFixed(2)} op je balans.`);
    },
};