const client = require("..");
const { guildId, picperms } = require("../config");

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
  
    if (customStatus && customStatus.state === '.gg/liberte') {
      if (!member.roles.cache.has(roleId)) {
        member.roles.add(role)
          .then(() => console.log(`Rol "${role.name}" toegevoegd aan ${member.user.tag}.`))
          .catch(console.error);
      }
    } else {
      if (member.roles.cache.has(roleId)) {
        member.roles.remove(role)
          .then(() => console.log(`Rol "${role.name}" verwijderd van ${member.user.tag}.`))
          .catch(console.error);
      }
    }
  });