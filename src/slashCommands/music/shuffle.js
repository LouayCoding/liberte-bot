const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'shuffle',
    description: "Give someone a slap",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        await this.shuffle(interaction);
        return interaction.reply({ content: 'Succesvol geshufflet.', ephemeral: true });
    }
};

