const { ApplicationCommandType, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'ticket',
    description: "Give someone a slap",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {

        const embed = new EmbedBuilder()
            .setTitle('Support')
            .setDescription('Klik op de knop hieronder om een ticket aan te maken. Misbruik van deze functie wordt niet getolereerd en kan leiden tot een ban voor alle gebruikers.')
            .setColor('#5865F2');

        const ticketButton = new ButtonBuilder()
            .setCustomId('ticket')
            .setLabel('Ticket openen')
            .setEmoji('📩')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(ticketButton);


        await interaction.reply({
            embeds: [embed],
            components: [row],
        });


        console.log
    },

};
