const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'ban',
    description: "Skip het huidigr nummer",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const member = interaction.options.get('member');

        
        if (member.roles.position >= interaction.member.roles.position) return interaction.reply({ content: 'Je kan een moderator niet verbannen.', ephemeral: true });
        if (member.roles.position >= interaction.guild.members.me.roles.position) return interaction.reply({ content: 'Ik kan deze gebruiker niet vervannen, omdat zijn/haar rol hoger is.', ephemeral: true });
        if (!interaction.guild.members.me.permissions.has('BAN_MEMBERS')) return interaction.reply({ content: 'Ik heb `BAN_MEMBER` permissies nodig om dit commando te kunnen uitvoeren.', ephemeral: true });
        if(!member.bannabale) return interaction.reply('Deze gebruiker kan niet worden verbannen.');
        
    }
};

