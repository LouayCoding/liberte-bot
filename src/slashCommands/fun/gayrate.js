const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'gayrate',
    description: "Bekijk hoe gay iemand is",
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
        const targetUser = interaction.options.getUser('gebruiker') || interaction.user;
        const text = gayRate(targetUser);

        const embed = new EmbedBuilder()
            .setDescription(text)

        await interaction.reply({ embeds: [embed] });

        function gayRate(targetUser) {
            const result = Math.ceil(Math.random() * 100);
            if (interaction.user.id === targetUser.id) return `Jij bent **${result}%** gay.`
            return `${targetUser} is **${result}%** gay 🏳️‍🌈.`
        }
    }
};


