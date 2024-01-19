const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'play',
    description: "Speel een liedje af",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'nummer',
            description: 'Het liedje dat je wilt afspelen.',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const nummer = interaction.options.get('nummer')?.value;

        const embed = new EmbedBuilder().setDescription(`Aan het zoeken naar **${nummer}**...`).setColor(primaryColor);
        const interactionReply = await interaction.reply({ embeds: [embed] });
        

        client.distube.play(interaction.member.voice.channel, nummer, {
            interaction,
            metadata: { interaction: interactionReply.interaction },
            member: interaction.member,
            textChannel: interaction.channel,
        });

    }
};
