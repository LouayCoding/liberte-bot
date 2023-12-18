const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

module.exports = {
    name: 'daily',
    description: "Claim je dagelijkse beloning binnen de economiemodule.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        let user = client.eco.cache.users.get({
            memberID: interaction.member.id,
            guildID: interaction.guild.id
        });

        const dailyResult = await user.rewards.getDaily()

        if (!dailyResult.claimed) {
            const cooldownTime = dailyResult.cooldown.time

            const cooldownTimeString =
                `${cooldownTime.days ? `**${cooldownTime.days}** dagen, ` : ''}` +

                `${cooldownTime.days || cooldownTime.hours ?
                    `**${cooldownTime.hours}** uren, `
                    : ''}` +

                `${cooldownTime.hours || cooldownTime.minutes ?
                    `**${cooldownTime.minutes}** minuten, ` :
                    ''}` +
                `**${cooldownTime.seconds}** seconden`


            return interaction.reply({ content: `Je kunt je dagelijkse beloning claimen over ${cooldownTimeString}.`, ephemeral: true })
        }

        const embed = new EmbedBuilder()
            .setDescription(`Je hebt je dagelijkse beloning van **${dailyResult.reward}** euro geclaimd!`)
            .setColor('5865F2');

        interaction.reply({ embeds: [embed] })
    }
};
