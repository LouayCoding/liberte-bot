const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'resume',
    description: "Hevat het afspelen",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const resume = await client.music.resume(interaction);

    }
};

