const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'skip',
    description: "Sla het huidige nummer over of kies hoeveel nummers je wilt overslaan",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const skip = await client.music.skip(interaction);
    }
};

