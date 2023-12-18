const { ButtonStyle, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");


module.exports = {
    name: 'film',
    description: "Zoek en bekijk films/series!",
    options: [
        {
            name: 'film',
            description: 'Reden voor de ban.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const film = interaction.options.getString('film');
        const apiKey = 'aae853390cbe83787f23c19ac39a0db1'; // Replace with your TMDb API key

        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(film)}`)
            .then(response => response.json())
            .then(movieInfoo => {
                // Work with the retrieved data here
                let movieInfo = movieInfoo.results[0]
                console.log(movieInfo)

                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('Bekijken')
                            .setStyle(ButtonStyle.Link)
                            .setURL(`https://vidsrc.to/embed/movie/${movieInfo.id}`))

                const embed = new EmbedBuilder()
                    .setTitle(movieInfo.title)
                    .setDescription(movieInfo.overview)
                    .setImage(`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`);
                interaction.channel.send({ embeds: [embed], components: [row] });
            })
            .catch(error => {
                // Handle errors here
                console.error('Error:', error);
            });


    }
};