const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'repeat',
    description: "Herhaal het huidige nummer of de afspeellijst",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const skip = await client.music.repeat(interaction);
    }
};

