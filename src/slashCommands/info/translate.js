const translate = require('@iamtraction/google-translate');

const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'translate',
    description: 'Vertaal tekst naar een andere taal.',
    options: [
        {
            name: 'tekst',
            description: 'De tekst die moet worden vertaald.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'doeltaal',
            description: 'De doeltaal waarin de tekst moet worden vertaald.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const textToTranslate = interaction.options.getString('tekst');
        const targetLanguage = interaction.options.getString('doeltaal');

        try {
            const translatedText = await translate(textToTranslate, { to: targetLanguage });
            await interaction.reply(`Vertaald naar **${targetLanguage}**: ${translatedText.text}`);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Er is een fout opgetreden bij het vertalen.', ephemeral: true });
        }
    },
};
