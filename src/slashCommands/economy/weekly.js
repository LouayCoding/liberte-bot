const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

module.exports = {
    name: 'weekly',
    description: "Claim je wekelijkse beloning binnen de economiemodule.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        let user = client.eco.cache.users.get({
            memberID: interaction.member.id,
            guildID: interaction.guild.id
        });

        const weeklyResult = await user.rewards.getWeekly()

        if (!weeklyResult.claimed) {
            const cooldownTime = weeklyResult.cooldown.time

            const cooldownTimeString =
                `${cooldownTime.days ? `**${cooldownTime.days}** dagen, ` : ''}` +

                `${cooldownTime.days || cooldownTime.hours ?
                    `**${cooldownTime.hours}** uren, `
                    : ''}` +

                `${cooldownTime.hours || cooldownTime.minutes ?
                    `**${cooldownTime.minutes}** minuten, ` :
                    ''}` +
                `**${cooldownTime.seconds}** seconden`


            return interaction.reply({ content: `Je kunt je wekelijkse beloning claimen over ${cooldownTimeString}.`, ephemeral: true })
        }

        const embed = new EmbedBuilder()
            .setDescription(`Je hebt je wekelijkse beloning van **${weeklyResult.reward}** euro geclaimd!`)
            .setColor('5865F2');

        interaction.reply({ embeds: [embed] })
    }
};
