const { EmbedBuilder } = require("discord.js");
const client = require("..");
const { guildId, picperms, vanityChannelId, color, footer } = require("../config");

client.on('presenceUpdate', (oldPresence, newPresence) => {
  const roleId = picperms; // De rol die je wilt toekennen

  const guild = client.guilds.cache.get(guildId);
  const role = guild.roles.cache.get(roleId);

  if (!role) {
    console.error(`De rol met ID ${roleId} werd niet gevonden.`);
    return;
  }

  const member = guild.members.cache.get(newPresence.user.id);

  if (!member) {
    console.error(`De gebruiker met ID ${newPresence.user.id} werd niet gevonden.`);
    return;
  }

  const customStatus = newPresence.activities.find(activity => activity.type === 4);
  const customStatusState = customStatus ? customStatus.state : null; // Sla de status state op


  if (customStatus && customStatus.state && customStatus.state.includes('.gg/dirham')){
    if (!member.roles.cache.has(roleId)) {
      member.roles.add(role)
        .then(() => {
          console.log(`Rol "${role.name}" toegevoegd aan ${member.user.tag}.`);
          sendStatusChangeLog(member, `**Gebruikt nu de vanity ${customStatusState}**`, '#43B582');
        })
        .catch(console.error);
    }
  } else {
    if (member.roles.cache.has(roleId)) {
      member.roles.remove(role)
        .then(() => {
          console.log(`Rol "${role.name}" verwijderd van ${member.user.tag}.`);
          sendStatusChangeLog(member, `**${member} heeft de vanity verwijderd**`, '#FF470F');
        })
        .catch(console.error);
    }
  }

  // Functie om logberichten te sturen naar het logkanaal
  function sendStatusChangeLog(member, description, logColor) {
    const guild = member.guild;
    const logChannel = guild.channels.cache.get(vanityChannelId);
    if (!logChannel) {
      console.error('Logkanaal niet gevonden');
      return;
    }

    const embed = new EmbedBuilder()
      .setAuthor({ name: member.user.tag, iconURL: member.user.displayAvatarURL() })
      .setDescription(description)
      .setColor(logColor) // Gebruik de gewijzigde parameter naam
      .setTimestamp()
      .setFooter({ text: footer})

    logChannel.send({ embeds: [embed] }).catch(console.error);
  }
});
