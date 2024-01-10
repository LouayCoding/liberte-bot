const { ActivityType, EmbedBuilder } = require('discord.js');
const client = require('..');
const chalk = require('chalk');
const Economy = require('discord-economy-super/mongodb');
const { economy } = require('../utils/eco');


client.on("ready", async () => {
	console.log(chalk.red(`Logged in as ${client.user.tag}!`));

	client.user.setPresence({
        activities: [{ name: '.gg/dirham picperms', type: ActivityType.Custom }], // You can change 'PLAYING' to 'WATCHING', 'LISTENING', etc.
        status: 'online' // Can be 'online', 'idle', 'dnd', or 'invisible'
    });

	client.eco = new Economy({
		connection: {
			connectionURI: 'mongodb+srv://attahirilouay:attahirilouay@cluster0.p4o8ut9.mongodb.net/',
			dbName: 'test',
			collectionName: 'economy'
		},
	
		dailyAmount: 100,
		workAmount: [50, 200],
		weeklyAmount: 5000
	})
	

});