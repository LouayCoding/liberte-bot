const { AttachmentBuilder } = require('discord.js');
const { LevelUp } = require('canvafy');
const Levels = require("discord-xp");

// Functie om te controleren of de gebruiker beheerdersrechten heeft en/of een mod-rol heeft
const leveling = async (message) => {
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        const levelUp = await new LevelUp()
            .setAvatar(message.author.displayAvatarURL())
            .setBackground("image", "https://images.unsplash.com/photo-1629935252276-2e9267f778a1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmlnaHQlMjBjYXJ8ZW58MHx8MHx8fDA%3D")
            .setUsername(message.author.username)
            .setBorder("#000")
            .setAvatarBorder("#FFF")
            .setOverlayOpacity(0.7)
            .setLevels(user.level - 1, user.level)
            .build();

        message.channel.send({
            files: [{
                attachment: levelUp,
                name: `levelup-${message.member.id}.png`
            }]
        });
    }
};

module.exports = { leveling };
