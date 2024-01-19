const { AttachmentBuilder, ApplicationCommandOptionType } = require('discord.js');
const Levels = require("discord-xp");
const { LeaderboardBuilder } = require('canvacord');


module.exports = {
    name: 'leaderboard',
    description: "Toont het leaderboard voor verschillende categorieën.",
    options: [
        {
            name: "leveling",
            description: "Toont de topgebruikers op basis van hun ervaringsniveau.",
            type: ApplicationCommandOptionType.Subcommand,
        },
        {
            name: "economy",
            description: "Toont de topgebruikers op basis van hun economische prestaties.",
            type: ApplicationCommandOptionType.Subcommand,
        },
    ],
    run: async (client, interaction) => {
        await interaction.deferReply();
        if (interaction.options.getSubcommand() === 'economy') {

            const getUser = userID => client.users.cache.get(userID)

            let guild = client.eco.cache.guilds.get({
                guildID: interaction.guild.id
            });

            const rawLeaderboard = await guild.leaderboards.money()

            const leaderboard = rawLeaderboard
                .filter(lb => !getUser(lb.userID)?.bot)
                .filter(lb => !!lb.money)

            if (!leaderboard.length) {
                return interaction.channel.send(`${interaction.user}, there are no users in the leaderboard.`)
            }
            const leaderboardArray = [];
            leaderboard.forEach((data, index) => {
                const member = interaction.guild.members.cache.get(data.userID);
                const balanceData = client.eco.cache.balance.get({ memberID: interaction.member.id, guildID: interaction.guild.id });
                const [balance, bank] = [balanceData?.money, balanceData?.bank];
                leaderboardArray.push({
                    rank: index + 1,
                    avatar: member ? member.user.displayAvatarURL({ extension: "png" }) : 'https://cdn.discordapp.com/avatars/935943312815300699/38a45888794ddb0c325235981f2258d9.png?size=4096',
                    username: member ? member.username : "Unknown Member",
                    displayName: member ? member.displayName : "Unknown Member",
                    level: balance,
                    xp: bank
                });
            });

            const leaderboardCard = new LeaderboardBuilder() // Build the Rank Card
                .setHeader({ image: interaction.guild.iconURL({ extension: "png" }), title: `${interaction.guild.name} Economy Leaderboard` })
                .setBackground('https://wallpapercave.com/wp/wp9392067.png')
                .setPlayers(leaderboardArray)
                .adjustCanvas()

            const imageBuffer = await leaderboardCard.build({ format: "png" });
            const attachment = new AttachmentBuilder(imageBuffer, "leaderboard.png");
            interaction.reply({ files: [attachment] });

        } else if (interaction.options.getSubcommand() === 'leveling') {

            const leaderboardData = await Levels.fetchLeaderboard(interaction.guild.id, 10);
            const leaderboardArray = [];

            leaderboardData.forEach((data, index) => {
                const member = interaction.guild.members.cache.get(data.userID);
                if(!member) return;
                leaderboardArray.push({
                    rank: index + 1,
                    avatar: member ? member.user.displayAvatarURL({ extension: "png", forceStatic: true }) : 'https://cdn.discordapp.com/avatars/935943312815300699/38a45888794ddb0c325235981f2258d9.png?size=4096',
                    username: member ? member.username : "Unknown Member",
                    displayName: member ? member.displayName : "Unknown Member",
                    level: data.level,
                    xp: data.xp
                });
            });


            const leaderboard = new LeaderboardBuilder() // Build the Rank Card
                .setHeader({ image: interaction.guild.iconURL({ extension: "png" }), title: `${interaction.guild.name} Leveling Leaderboard` })
                .setBackground('https://i.imgur.com/vY0uzBD.jpg')
                .setPlayers(leaderboardArray)
                .adjustCanvas()

            const imageBuffer = await leaderboard.build({ format: "png" });
            const attachment = new AttachmentBuilder(imageBuffer, "leaderboard.png");
            interaction.editReply({ files: [attachment] });
        }

    }
};
