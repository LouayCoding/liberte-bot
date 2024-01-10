const { EmbedBuilder } = require("discord.js");
const client = require("..");
const { joinLogChannelId } = require("../config");


client.on('guildMemberRemove', member => {
    const leaveEmbed = new EmbedBuilder()
        .setColor('#FF470F')
        .setAuthor({ name: 'Lid Vertrokken', iconURL: member.user.displayAvatarURL() })
        .setDescription(`${member.user.tag}`)
        .setFooter({ text: `ID: ${member.id}` })
        .setTimestamp();

    // Send the embed to a specific channel
    const channel = member.guild.channels.cache.get(joinLogChannelId);
    if (channel) channel.send({ embeds: [leaveEmbed] });
});
