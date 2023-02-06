const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

function addSong(client) {
    client.distube.on('addSong', (queue, song) => {
        console.log('ss/')
        const interaction = song.metadata.i;

        const embed = new EmbedBuilder()
            .setTitle(song.name)
            .setURL(song.url)
            .setAuthor({ name: 'Toegevoegd aan wachtrij', iconURL: 'https://im3.ezgif.com/tmp/ezgif-3-00f7be0751.gif' })
            .addFields(
                { name: 'Kanaal', value: song.uploader.name, inline: true },
                { name: 'Duur', value: song.formattedDuration, inline: true },
                { name: 'Views', value: `${song.views}`, inline: true },
                { name: 'Aanvrager', value: `${song.user.tag}`, inline: true }
            )
            .setThumbnail(song.thumbnail)

       
        interaction.editReply({ embeds: [embed] });


    });
};

module.exports = addSong;


