const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const { primaryColor } = require('../../config');

const COINMARKETCAP_API_KEY = '90cadb2e-e4a7-4749-9361-1cf883d2d770'; // Vervang dit met je eigen API-sleutel

async function getCoinData(coinSymbol) {
    try {
        const response = await fetch(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${coinSymbol}`, {
            headers: {
                'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fout bij het ophalen van prijsinformatie:', error);
        return null;
    }
}

module.exports = {
    name: 'price',
    description: 'Geeft de huidige marktprijs van een specifieke cryptocurrency.',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'coin',
            description: 'De cryptocurrency waarvan je de prijs wilt weten (gebruik de afkorting, zoals BTC).',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const { options } = interaction;
        const coinSymbol = options.getString('coin').toUpperCase();

        const data = await getCoinData(coinSymbol);
        if (!data || data.status.error_code !== 0) {
            interaction.reply('De opgegeven cryptocurrency kon niet worden gevonden of er is een fout opgetreden.');
            return;
        }

        const priceUSD = data.data[coinSymbol].quote.USD.price;
       
        const embed = new EmbedBuilder()
            .setAuthor({ name: `${coinSymbol}`, iconURL: `https://s2.coinmarketcap.com/static/img/coins/64x64/${data.data[coinSymbol].id}.png` })
            .setColor(primaryColor)
            .setDescription(`De huidige prijs van **${coinSymbol}** is **$${priceUSD.toFixed(2)} USD**.`);

        interaction.reply({ embeds: [embed] });
    },
};
