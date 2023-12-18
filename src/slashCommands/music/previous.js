const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'previous',
    description: "Ga terug naar het vorige nummer",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const resume = await client.music.previous(interaction);

    }
};

