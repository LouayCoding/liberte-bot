const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
    name: 'join',
    description: "Speel een liedje af",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        client.distube.voices.leave()


    }
};
