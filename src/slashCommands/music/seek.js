const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'seek',
    description: "Spring naar een specifiek tijdstip in het nummer",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const skip = await client.music.repeat(interaction);
    }
};

