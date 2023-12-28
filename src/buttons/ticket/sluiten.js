const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { ticketRoles } = require('../../config');

module.exports = {
    id: 'sluiten',
    permissions: [],
    run: async (client, interaction) => {
        interaction.channel.delete();
    },
}
