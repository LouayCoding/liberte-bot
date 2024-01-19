const { EmbedBuilder } = require('discord.js');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'ping',
    description: "Krijg de huidige ping van de bot en Discord API!",
    run: async (client, interaction) => {
        const pingEmbed = new EmbedBuilder()
            .setColor(primaryColor)
            .addFields(
                { name: 'Discord API Latency', value: `${client.ws.ping}ms` },
                { name: 'Discord Request Latency', value: `${Date.now() - interaction.createdTimestamp}ms` }
            );

        await interaction.reply({ embeds: [pingEmbed] });
    }
};
