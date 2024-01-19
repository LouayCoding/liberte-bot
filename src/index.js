const { Client, GatewayIntentBits, Partials, Collection, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { addSpeechEvent, SpeechEvents } = require("discord-speech-recognition");
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const path = require('path');
const config = require('./config');



const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildInvites,
		GatewayIntentBits.GuildVoiceStates
	],
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction]
});

addSpeechEvent(client, {
	group: '1193530865897185370',
	lang: 'en-EN'
});

const fs = require('fs');



require('dotenv').config();

client.distube = new DisTube(client, {
	leaveOnStop: false,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true
		}),
		new SoundCloudPlugin(),
		new YtDlpPlugin()
	]
})


const collections = ['commands', 'aliases', 'slashCommands', 'buttons', 'modals', 'menus'];
collections.forEach(name => client[name] = new Collection());


client.prefix = config.prefix;

module.exports = client;

fs.readdirSync(path.join(__dirname, 'handlers')).forEach((handler) => {
	const handlerPath = path.join(__dirname, 'handlers', handler);
	require(handlerPath)(client);
});


client.distube.on("playSong", async (queue, song) => {
	const interaction = song.metadata.interaction;

	const file = new AttachmentBuilder('src/assets/img/dj.gif');
	embed = new EmbedBuilder()
		.setAuthor({ name: 'Speelt nu', iconURL: 'attachment://dj.gif' })
		.setTitle(song.name)
		.setURL(song.url)
		.addFields(
			{ name: 'Kanaal', value: song.uploader.name, inline: true },
			{ name: 'Duur', value: song.formattedDuration, inline: true },
			{ name: 'Views', value: `${song.views.toLocaleString()}`, inline: true },
		)
		.setFooter({ text: `Er zitten ${queue.songs.length} nummer(s) in de queue` })
		.setThumbnail(song.thumbnail)

	await interaction.channel.send({ embeds: [embed], files: [file] })

});

client.distube.on("addSong", async (queue, song) => {

	const channel = queue.textChannel;
	embed = new EmbedBuilder().setDescription(`**[${song.name}](${song.url}) toegevoegd aan wachtrij.**`).setColor(primaryColor);
	await channel.send({ embeds: [embed] });

	embed = new EmbedBuilder().setDescription(`**[${song.name}](${song.url}) toegevoegd aan wachtrij.**`).setColor(primaryColor);
});




client.login(config.token)
