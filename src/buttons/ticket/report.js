const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    id: 'report',
    permissions: [],
    run: async (client, interaction) => {
        await interaction.reply({ content: 'Momenteel niet mogelijk', ephemeral: true})

    },
}
