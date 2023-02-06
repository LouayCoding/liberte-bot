const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'quote',
    description: "Show a random quote",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const { quote, author } = await generateQuote();

        const embed = new EmbedBuilder()
            .setAuthor({ name: author, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(quote)
            .setColor(client.config.primary_color)
        await interaction.reply({ embeds: [embed] });

        async function generateQuote() {
            const { data } = await axios.get('https://zenquotes.io/api/random');
            return { quote: data[0].q, author: data[0].a };
        }
    }
};
