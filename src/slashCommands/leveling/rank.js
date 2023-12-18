const { EmbedBuilder, AttachmentBuilder } = require('discord.js');
const Levels = require("discord-xp");
const { Font, RankCardBuilder, } = require("canvacord");
Font.loadDefault();

module.exports = {
    name: 'rank',
    description: "Krijg alle details over deze server in een oogopslag!",
    run: async (client, interaction) => {
        const target = interaction.member; // Grab the target.

        const user = await Levels.fetch(target.id, interaction.guildId, true); // Selects the target from the database.

        const rank = new RankCardBuilder() // Build the Rank Card
        .setAvatar(target.displayAvatarURL({format: 'jpg', size: 512}))
        .setCurrentXP(user.xp) // Current User Xp
        .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
        .setRank(user.position) // Position of the user on the leaderboard
        .setLevel(user.level) // Current Level of the user
        .setUsername(target.user.username)
        .setBackground('https://www.pixground.com/wp-content/uploads/2023/06/Blue-Abstract-Background-4K-Wallpaper-1024x576.webp')

    rank.build()
        .then(data => {
        const attachment = new AttachmentBuilder(data, "RankCard.svg");
        interaction.reply({ files: [attachment]});
    });
        
    }
};