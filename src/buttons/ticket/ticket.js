const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    id: 'ticket',
    permissions: [],
    run: async (client, interaction) => {
        const userSelect = new StringSelectMenuBuilder()
        .setCustomId('ticket')
        .setPlaceholder('Maak een keuze')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Solliciteren')
                .setValue('solliciteren')
                .setEmoji('✍️'), // Emoji die solliciteren vertegenwoordigt
            new StringSelectMenuOptionBuilder()
                .setLabel('Klacht indienen')
                .setValue('Klacht')
                .setEmoji('⚠️'), // Emoji voor klacht indienen
            new StringSelectMenuOptionBuilder()
                .setLabel('Suggestie indienen')
                .setValue('Suggestie')
                .setEmoji('💡'), // Emoji voor suggestie indienen
            new StringSelectMenuOptionBuilder()
                .setLabel('Overig')
                .setValue('Overig')
                .setEmoji('🔄') // Emoji voor andere zaken
        );

    const row1 = new ActionRowBuilder()
        .addComponents(userSelect);

    await interaction.reply({
        content: 'Selecteer een categorie',
        components: [row1],
        ephemeral: true
    });

    },
}
