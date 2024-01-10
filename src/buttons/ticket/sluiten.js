const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { ticketRoles, primaryColor } = require('../../config');

module.exports = {
    id: 'sluiten',
    permissions: [],
    run: async (client, interaction) => {
        const embed = new EmbedBuilder().setDescription('Dit ticket wordt binnen **3 seconden** gesloten.').setColor(primaryColor);
        interaction.reply({ embeds: [embed] })
        setTimeout(() => {
            interaction.channel.delete();
        }, 3000);

    },
}
