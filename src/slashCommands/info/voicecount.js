const { EmbedBuilder, ChannelType } = require('discord.js');
const timestampToDate = require('timestamp-to-date');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'voicecount',
    description: "Krijg het totale aantal leden in alle spraakkanalen van de server!",
    run: async (client, interaction) => {
        const voiceChannels = interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice);
        let memberCount = 0;
        voiceChannels.forEach(channel => {
            memberCount += channel.members.size;
        });
        const embed = new EmbedBuilder()
            .setDescription(`Er zijn **${memberCount} leden** in alle spraakkanalen.`)
            .setColor(primaryColor)

        return interaction.reply({ embeds: [embed] })
    }
};