const { Client, GatewayIntentBits, Events, EmbedBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");
const { addSpeechEvent, SpeechEvents } = require("discord-speech-recognition");
const client = require("..");
const { primaryColor } = require("../config");
client.on(SpeechEvents.speech, async msg => {
    const channel = msg.guild.channels.cache.get('1192614173675356170');
    console.log(msg?.content);
    if (msg.content == undefined) return;``
    if (msg.content.toLowerCase().startsWith("bot play") || msg.content.toLowerCase().startsWith("pot play") || msg.content.toLowerCase().startsWith("but play") || msg.content.toLowerCase().startsWith("bots play") || msg.content.toLowerCase().startsWith("botplay")) {
  
      const nummer = msg.content.split(' ').slice(2).join(' ');
      const embed = new EmbedBuilder().setDescription(`Aan het zoeken naar **${nummer}**...`).setColor(primaryColor);
      const message = await channel.send({ embeds: [embed] });
      const member = await msg.guild.members.cache.get(msg.author.id)

      client.distube.play(member.voice.channel, nummer, {
          message,
          metadata: { message: msg },
          member: member,
          textChannel: channel,
      });
    
    }
          
});
