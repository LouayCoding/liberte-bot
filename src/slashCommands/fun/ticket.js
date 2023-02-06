const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType, ButtonStyle } = require('discord.js');
const axios = require('axios');

module.exports = {
    name: 'ticket',
    description: "Give someone a slap",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('application')
                    .setLabel('Solliciteer')
                    .setEmoji('✉️')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('report')
                    .setLabel('Rapporteer')
                    .setEmoji('💬')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId('other')
                    .setLabel('Overig')
                    .setEmoji('❔')
                    .setStyle(ButtonStyle.Success),
            );      

        const embed = new EmbedBuilder()
            .setAuthor({ name: 'Ticket', iconURL: client.user.displayAvatarURL() })
            .setColor(client.config.primaryColor)
            .setDescription('Klik op de knop hieronder om een ticket aan te maken. Misbruik van deze functie wordt niet getolereerd en kan leiden tot een ban voor alle gebruikers.')

        interaction.channel.send({ embeds: [embed], components: [row] });
    }
};
