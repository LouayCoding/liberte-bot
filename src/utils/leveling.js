const { AttachmentBuilder } = require('discord.js');
const { LevelUp } = require('canvafy');
const Levels = require("discord-xp");
const { picperms, levelupChannelId } = require('../config');

// Functie om te controleren of de gebruiker beheerdersrechten heeft en/of een mod-rol heeft
const leveling = async (message) => {
    
    const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);

        const levelUp = await new LevelUp()
            .setAvatar(message.author.displayAvatarURL())
            .setBackground("image", "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i.f.om_l4jgc/v0/-1x-1.jpg")
            .setUsername(message.author.username)
            .setBorder("#fff")
            .setAvatarBorder("#FFF")
            .setOverlayOpacity(0.7)
            .setLevels(user.level - 1, user.level)
            .build();

        const levelChannel = message.guild.channels.cache.get(levelupChannelId);

        levelChannel.send({
            files: [{
                attachment: levelUp,
                name: `levelup-${message.member.id}.png`
            }]
        });
    }
};

module.exports = { leveling };
