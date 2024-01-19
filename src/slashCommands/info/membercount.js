const { EmbedBuilder } = require('discord.js');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'membercount',
    description: "Krijg het totale aantal leden op de server!",
    run: async (client, interaction) => {
        const memberCount = interaction.guild.memberCount;

        const embed = new EmbedBuilder()
            .setDescription(`Er zijn **${memberCount} leden** in de server.`)
            .setColor(primaryColor);

        return interaction.reply({ embeds: [embed] });
    }
};
