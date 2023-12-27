

  const { ActivityType, EmbedBuilder } = require('discord.js');
const client = require('..');
const chalk = require('chalk');
const { WelcomeLeave } = require('canvafy')

client.on('guildMemberAdd', async member => {
    const welcome = await new WelcomeLeave()
    .setAvatar(member.user.displayAvatarURL({ forceStatic: true, extension: "png" }))
    .setBackground("image", "https://images.unsplash.com/photo-1629935252276-2e9267f778a1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmlnaHQlMjBjYXJ8ZW58MHx8MHx8fDA%3D")
    .setTitle(member.user.username)
    .setDescription("Welkom in onze Discord server Liberté")
    .setBorder("#000")
    .setAvatarBorder("#000")
    .setOverlayOpacity(0.3)
    .build();
  
    member.guild.channels.cache.get("1184374411822907413").send({
      files: [{
        attachment: welcome,
        name: `welcome-${member.id}.png`
      }]
    });
  });