const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'pedorate',
    description: "Bekijk hoe pedo iemand is",
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
        const text = pedoRate(user);

        const embed = new EmbedBuilder()
            .setDescription(text)
            .setColor(primaryColor)

        await interaction.reply({ embeds: [embed] });


        function pedoRate(mentionedUser) {
            const result = Math.ceil(Math.random() * 100);
            return `${mentionedUser} is **${result}%** pedo.`
        }
    }
};


