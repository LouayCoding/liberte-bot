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
                    .setLabel('Hulp')
                    .setValue('Hulp')
                    .setEmoji('🔄'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Minecraft whitelist')
                    .setValue('minecraft')
                    .setEmoji('<:Minecraft:1194636062757232723>'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Vrouwen rol')
                    .setValue('Vrouw')
                    .setEmoji('🌸'), // Emoji voor suggestie indienen

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
