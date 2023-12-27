const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { YtDlpPlugin } = require('@distube/yt-dlp');
const Music = require('../src/utils/loadMusic');
const path = require('path');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://attahirilouay:attahirilouay@cluster0.3hipxxt.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});




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

const fs = require('fs');
const config = require('./config.json');

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
client.config = config;
client.music = new Music(client);

module.exports = client;

fs.readdirSync(path.join(__dirname, 'handlers')).forEach((handler) => {
	const handlerPath = path.join(__dirname, 'handlers', handler);
	require(handlerPath)(client);
  });

client.music.loadMusic(client);


client.login(process.env.TOKEN)
