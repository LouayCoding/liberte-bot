const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ComponentType } = require("discord.js");

async function playEvent(client) {
    client.distube.on('playSong', async (queue, song) => {
        const interaction = song.metadata.i;

        const embed = new EmbedBuilder()
            .setTitle(song.name)
            .setURL(song.url)
            .setAuthor({ name: 'Speelt nu', iconURL: 'https://im3.ezgif.com/tmp/ezgif-3-00f7be0751.gif' })
            .addFields(
                { name: 'Kanaal', value: song.uploader.name, inline: true },
                { name: 'Duur', value: song.formattedDuration, inline: true },
                { name: 'Views', value: `${song.views.toLocaleString()}`, inline: true },
                { name: 'Position', value: `${song.user.tag}`, inline: true }
            )
            .setFooter({ name: `Er zitten ${queue.length} nummers in de queue`})
            .setThumbnail(song.thumbnail)

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('pauseplay')
                    .setEmoji('1069993800124080138')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('previous')
                    .setEmoji('1069321692817674340')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('skip')
                    .setEmoji('1069321688912777357')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('loop')
                    .setEmoji('1069317774335287366')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('stop')
                    .setEmoji('1069321694302441573')
                    .setStyle(ButtonStyle.Danger),
            );

        const row1 = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('backward')
                    .setEmoji('1069321684793950269')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('forward')
                    .setEmoji('1069321687209873438')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('shuffle')
                    .setEmoji('1069319435090927676')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId('like')
                    .setEmoji('⭐')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId('lyrics')
                    .setEmoji('📰')
                    .setStyle(ButtonStyle.Primary),
            );

        const message = await interaction.channel.send({ embeds: [embed], components: [row, row1] });
        song.metadata.i = message;

        await client.music.buttonCollector(message, interaction)






    });
};

module.exports = playEvent;


