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
        .setBackground('https://images.unsplash.com/photo-1629935252276-2e9267f778a1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmlnaHQlMjBjYXJ8ZW58MHx8MHx8fDA%3D')

    rank.build()
        .then(data => {
        const attachment = new AttachmentBuilder(data, "RankCard.svg");
        interaction.reply({ files: [attachment]});
    });
        
    }
};