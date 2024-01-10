const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'kechrate',
    description: "Bekijk hoe hoerig iemand is",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'gebruiker',
            description: 'De gebruiker die je wilt controleren.',
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.get('gebruiker')?.user || interaction.user;
        const text = kechRate(user, interaction.user);

        const embed = new EmbedBuilder()
            .setDescription(text)
            .setColor(primaryColor)

        await interaction.reply({ embeds: [embed] });


        function kechRate(mentionedUser, author) {
            const result = Math.ceil(Math.random() * 100);
            return `${mentionedUser} is **${result}%** kech.`
        }
    }
};


