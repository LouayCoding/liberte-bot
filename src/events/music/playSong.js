const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, AttachmentBuilder } = require("discord.js");


async function playEvent(client) {
    client.distube.on('playSong', async (queue, song) => {
        

       
        

       

      

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
        
       
        const message = await interaction.channel.send({ embeds: [embed], components: [row, row1], files: [file] });
        console.log(queue.connection)
        song.metadata.i = message;

        await client.music.buttonCollector(message, interaction)






    });
};

module.exports = playEvent;


