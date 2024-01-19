const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'say',
    description: 'Laat de bot een door de gebruiker opgegeven tekstbericht herhalen.',
    options: [
        {
            name: 'tekst',
            description: 'De tekst die de bot moet herhalen.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const messageToSay = interaction.options.getString('tekst');
        
        // Verstuur de tekst naar het kanaal
        await interaction.channel.send(messageToSay);

        // Stuur een reply dat de tekst succesvol is verzonden (ephemeral)
        await interaction.reply({ content: 'Tekst succesvol verzonden!', ephemeral: true });
    },
};
