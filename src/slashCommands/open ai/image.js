const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = {
    name: 'image',
    description: "Stel de bot een vraag",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'question',
            description: 'De vraag die je wilt stellen',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async (client, interaction) => {
        const question = interaction.options.get('question').value;

        await interaction.deferReply();

        const response = await openai.createImage({
            prompt: question,
            n: 1,
            size: "1024x1024",
        });
        image_url = response.data.data[0].url;

        interaction.channel.send(image_url)




    }
};
