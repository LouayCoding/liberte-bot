const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'stop',
    description: "Stop het afspelen en verwijder de wachtrij",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const stop = await client.music.stop(interaction);

    }
};

