const { AttachmentBuilder } = require('discord.js');
const Levels = require("discord-xp");
const { Font, RankCardBuilder, } = require("canvacord");
Font.loadDefault();

module.exports = {
    name: 'rank',
    description: "Krijg alle details over deze server in een oogopslag!",
    run: async (client, interaction) => {
        await interaction.deferReply();
        const target = interaction.member;
        const user = await Levels.fetch(target.id, interaction.guildId, true);

        const rank = new RankCardBuilder()
            .setAvatar(target.displayAvatarURL({ format: 'jpg', size: 512 }))
            .setCurrentXP(user.xp)
            .setRequiredXP(Levels.xpFor(user.level + 1))
            .setRank(user.position)
            .setLevel(user.level)
            .setUsername(target.user.username)
            .setBackground('https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i.f.om_l4jgc/v0/-1x-1.jpg')

        rank.build()
            .then(data => {
                const attachment = new AttachmentBuilder(data, "RankCard.svg");
                interaction.editReply({ files: [attachment] });
            });

    }
};