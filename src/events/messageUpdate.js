const client = require("..");
const { berichtenLogChannelId, primaryColor } = require("../config");
const { ButtonStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require("discord.js");

client.on('messageUpdate', (oldMessage, newMessage) => {

  if(!oldMessage?.author || !oldMessage?.content) return;
  const channel = client.channels.cache.get(berichtenLogChannelId);

  const jumpButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel('Ga naar bericht').setURL(oldMessage.url);
  const row = new ActionRowBuilder().setComponents(jumpButton);

  const textEmbed = new EmbedBuilder()
    .setAuthor({ name: `${oldMessage.author.username}`, iconURL: `${oldMessage.member.user.displayAvatarURL()}` })
    .setDescription(`**Bericht bewerkt in ${oldMessage.channel}**`)
    .addFields(
      { name: 'Before', value: oldMessage.content, inline: false },
      { name: 'After', value: newMessage.content, inline: false }
    )
    .setTimestamp()
    .setColor(primaryColor)
    .setFooter({ text: `ID: ${oldMessage.author.id}` });

  channel.send({ embeds: [textEmbed], components: [row] });
});