const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'gayrate',
    description: "Look how gay someone is",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'user',
            description: 'The user you want to check.',
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    run: async (client, interaction) => {
        const user = interaction.options.get('user')?.user || interaction.user;
        const text = gayRate(user, interaction.user);

        const embed = new EmbedBuilder()
            .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
            .setDescription(text)
            .setColor(client.config.primaryColor)

        await interaction.reply({ embeds: [embed] });



        async function kissGif() {
            const response = await axios.get('https://api.otakugifs.xyz/gif?reaction=hug');
            return response.data.url;
        }

        async function generateGif() {
            const { data } = await axios.get('https://purrbot.site/api/img/nsfw/yaoi/gif');
            return data.link;
        }

        function gayRate(mentionedUser, author) {
            const result = Math.ceil(Math.random() * 100);
            if(mentionedUser.id === author.id) return `You are **${result}%** gay 🏳️‍🌈.`
            else return `${mentionedUser} is **${result}%** gay 🏳️‍🌈.`
        }
    }
};


