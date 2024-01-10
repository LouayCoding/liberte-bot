const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'simprate',
    description: "Bekijk hoe simp iemand is",
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
        const text = gayRate(user, interaction.user);

        const embed = new EmbedBuilder()
            .setDescription(text)

        await interaction.reply({ embeds: [embed] });


        function gayRate(mentionedUser, author) {
            const result = Math.ceil(Math.random() * 100);
            return `${mentionedUser} is **${result}%** simp.`
        }
    }
};


