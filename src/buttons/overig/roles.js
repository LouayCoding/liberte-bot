const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { ticketCategoryId, vrouwenRol } = require('../../config');

module.exports = {
    id: 'roles',
    permissions: [],
    run: async (client, interaction) => {

        const roleId = interaction.customId.split('-')[1];
        const member = interaction.member;

        if (member.roles.cache.has(roleId)) {
            member.roles.remove(roleId)
                .then(() => {
                    interaction.reply({ content: `Ik heb de rol <@&${roleId}> van je verwijderd.`, ephemeral: true });
                })
                .catch((error) => {
                    console.error(error);
                    interaction.reply({ content: "Er is een fout opgetreden bij het verwijderen van de rol.", ephemeral: true });
                });
        } else {
            member.roles.add(roleId)
                .then(() => {
                    interaction.reply({ content: `Ik heb de rol <@&${roleId}> aan je toegevoegd.`, ephemeral: true });
                })
                .catch((error) => {
                    console.error(error);
                    interaction.reply({ content: "Er is een fout opgetreden bij het toevoegen van de rol.", ephemeral: true });
                });
        }

    }
}