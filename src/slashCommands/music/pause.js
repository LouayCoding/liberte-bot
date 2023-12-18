const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'pause',
    description: "Pauzeer het afspelen",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        await client.music.pause(interaction);
    }
};

