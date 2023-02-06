const { ApplicationCommandType, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const progressbar = require('string-progressbar');

module.exports = {
    name: 'nowplaying',
    description: "Give someone a slap",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    run: async (client, interaction) => {
        const queue = client.distube.getQueue(interaction);
        if (!queue) return interaction.reply({ content: 'Er word nu niks afgespeeld.', ephemeral: true });
        const song = queue.songs[0];

        const currentTime = queue.currentTime;
        const formattedCurrentTime = queue.formattedCurrentTime;
        const formattedDuration = song.formattedDuration;
        const duration = song.duration;

        const progressBar = progressbar.splitBar(duration, currentTime, 16)[0];

        const embed = new EmbedBuilder()
            .setTitle(song.name)
            .setURL(song.url)
            .setAuthor({ name: 'Speelt nu', iconURL: 'https://im3.ezgif.com/tmp/ezgif-3-00f7be0751.gif' })
            .addFields(
                { name: 'Kanaal', value: song.uploader.name, inline: true },
                { name: 'Duur', value: song.formattedDuration, inline: true },
                { name: 'Views', value: `${song.views.toLocaleString()}`, inline: true },
                { name: 'Progress', value: `${formattedCurrentTime} ▮ ${progressBar} ▮ ${formattedDuration}`, inline: true }
            )
            .setThumbnail(song.thumbnail);

        await interaction.channel.send({ embeds: [embed] });

    }
};

