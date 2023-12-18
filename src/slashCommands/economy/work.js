const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

module.exports = {
    name: 'work',
    description: "Ga aan het werk en verdien geld binnen de economiemodule.",
    type: ApplicationCommandType.ChatInput,
    run: async (client, interaction) => {

        let user = client.eco.cache.users.get({
            memberID: interaction.member.id,
            guildID: interaction.guild.id
        });

        const workResult = await user.rewards.getWork()

        if (!workResult.claimed) {
            const cooldownTime = workResult.cooldown.time

            const cooldownTimeString =
                `${cooldownTime.days ? `**${cooldownTime.days}** dagen, ` : ''}` +

                `${cooldownTime.days || cooldownTime.hours ?
                    `**${cooldownTime.hours}** uren, `
                    : ''}` +

                `${cooldownTime.hours || cooldownTime.minutes ?
                    `**${cooldownTime.minutes}** minuten, ` :
                    ''}` +
                `**${cooldownTime.seconds}** seconden`


            return interaction.reply({ content: `Je kunt weer werken over ${cooldownTimeString}.`, ephemeral: true })
        }

        const embed = new EmbedBuilder()
            .setDescription(getRandomSentence())
            .setColor('5865F2');

        function getRandomSentence() {
            const sentences = [
                `Fantastisch werk, ${interaction.member}! Jouw toewijding in de winkel heeft je **${workResult.reward}** euro opgeleverd!`,
                `Geweldige inzet, ${interaction.member}! Je verdient **${workResult.reward}** euro voor je tijd als ober!`,
                `Uitstekend, ${interaction.member}! Jouw harde werk in de fabriek heeft zojuist **${workResult.reward}** euro opgeleverd!`,
                `Bravo, ${interaction.member}! Het schoonmaken heeft zijn vruchten afgeworpen: **${workResult.reward}** euro!`,
                `Hoera, ${interaction.member}! Je verdient **${workResult.reward}** euro voor je inzet als tuinman/vrouw vandaag!`,
                `Schouderklopje, ${interaction.member}! Jouw toewijding als receptionist(e) heeft **${workResult.reward}** euro verdiend!`
            ];
            const randomIndex = Math.floor(Math.random() * sentences.length);
            return sentences[randomIndex];
        }


        interaction.reply({ embeds: [embed] })
    }
};
