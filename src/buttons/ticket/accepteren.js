const { PermissionsBitField , EmbedBuilder } = require('discord.js');
const { ticketRoles, vrouwenRol, primaryColor, succesColor } = require('../../config');

module.exports = {
    id: 'accepteren',
    permissions: [],
    run: async (client, interaction) => {
        const memberId = interaction.customId.split('-')[1];
        const member = interaction.guild.members.cache.get(memberId);
        const role = interaction.guild.roles.cache.get(vrouwenRol);
        
        const hasTicketRole = member.roles.cache.some(userRole => ticketRoles.includes(userRole.id));

        if (!hasTicketRole) {
            if (!member.permissions.has(PermissionsBitField.Flags.KickMembers || PermissionsBitField.Flags.BanMembers)) {
                await interaction.reply({ content: "Je hebt niet de vereiste rol om dit te doen.", ephemeral: true });
            }
        }

       
        
        member.roles.add(vrouwenRol);

        const embed = new EmbedBuilder()
            .setDescription(`${member} heeft de ${role} ontvangen.`)
            .setColor(succesColor);

        interaction.reply({ embeds: [embed] });
    },
};
