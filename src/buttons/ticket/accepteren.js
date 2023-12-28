const { EmbedBuilder } = require('discord.js');
const { ticketRoles, vrouwenRol } = require('../../config');

module.exports = {
    id: 'accepteren',
    permissions: [],
    run: async (client, interaction) => {
        const role = interaction.guild.roles.cache.get(vrouwenRol);
        const user = interaction.member;
        const hasTicketRole = user.roles.cache.some(role => ticketRoles.includes(role.id));

        if (!hasTicketRole) {
            await interaction.reply({ content: "Je hebt niet de vereiste rol om dit te doen.", ephemeral: true });
            return;
        }

        const memberId = interaction.customId.split('-')[1];
        const member = interaction.guild.members.cache.get(memberId);
        member.roles.add(vrouwenRol);


        const embed = new EmbedBuilder()
            .setDescription(`${member} heeft de ${role} ontvangen.`)
            .setColor('#5865F2')
        interaction.channel.send({ embeds: [embed] })



    },
}
