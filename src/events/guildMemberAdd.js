

const { EmbedBuilder } = require('discord.js');
const client = require('..');
const { joinLogChannelId, succesColor } = require('../config');

client.on('guildMemberAdd', member => {
  const joinEmbed = new EmbedBuilder()
    .setAuthor({ name: 'Lid toegetreden', iconURL: member.user.displayAvatarURL() })
    .setColor(succesColor)
    .setDescription(`${member} ${member.user.tag}`)
    .addFields({ name: 'Account Leeftijd', value: calculateAccountAge(member.user.createdAt) })
    .setFooter({ text: `ID: ${member.id}` })
    .setTimestamp()

  // Send the embed to a specific channel
  const channel = member.guild.channels.cache.get(joinLogChannelId);
  if (channel) channel.send({ embeds: [joinEmbed] });
});

function calculateAccountAge(creationDate) {
  const now = new Date();
  const diff = now - creationDate;
  const age = new Date(diff);
  return `${age.getUTCFullYear() - 1970} years, ${age.getUTCMonth()} months, ${age.getUTCDate() - 1} days`;
}

