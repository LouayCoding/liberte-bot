const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = {
    name: 'ask',
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

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: question,
            temperature: 0,
            max_tokens: 3900,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        interaction.deleteReply();

        if (response.data && response.data.choices && response.data.choices[0].text) {
            const text = response.data.choices[0].text.trim();
            const embed = new EmbedBuilder()
                .setAuthor({ name: question })
                .setDescription(`\`\`\`\n${text}\`\`\``)
            interaction.channel.send({ embeds: [embed] })

        }


    }
};
