const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const { primaryColor, footer } = require('../../config');

module.exports = {
    name: 'snipe',
    description: "Toon het laatst verwijderde bericht",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,

    run: async (client, interaction) => {
        const snipedMessage = client.lastSnipe;
        if (!snipedMessage) {
            return interaction.reply({ content: 'Er zijn geen berichten om te snipen!', ephemeral: true });
        }

        const snipeEmbed = new EmbedBuilder()
            .setColor(primaryColor)
            .setAuthor({ name: snipedMessage.author.tag, iconURL: snipedMessage.author.avatarURL() })
            .setDescription(snipedMessage.content)
            .setTimestamp(snipedMessage.date)
            .setFooter({ text: footer })

        return interaction.reply({ embeds: [snipeEmbed] });
    }
};
