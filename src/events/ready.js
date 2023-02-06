const { ActivityType, EmbedBuilder } = require('discord.js');
const client = require('..');
const chalk = require('chalk');

client.on("ready", async () => {
	console.log(chalk.red(`Logged in as ${client.user.tag}!`));

});