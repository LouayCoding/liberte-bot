const { EmbedBuilder, Collection, PermissionsBitField } = require('discord.js')
const ms = require('ms');
const urlRegex = require('url-regex-safe');
const client = require('..');
const config = require('../config');
const Levels = require("discord-xp");
const { tiktok } = require('../utils/tiktok');
const { countSystem } = require('../utils/countSystem');
const { leveling } = require('../utils/leveling');
Levels.setURL(config.databaseURL);


const prefix = client.prefix;
const cooldown = new Collection();

client.on('messageCreate', async message => {
	if (message.author.bot) return;
	if (message.channel.type !== 0) return;

	// await countSystem(message);

	await leveling(message);


	Array.from(new Set(message.content.match(urlRegex()))).slice(0, 1).forEach((url) => {
       tiktok(message, url);
    });

	if(message.content.toLocaleLowerCase().includes('picperms') || message.content.toLocaleLowerCase().includes('pic perms')){
		const embed = new EmbedBuilder()
		.setColor(config.primaryColor)
		.setDescription('Je kan **picperms** krijgen door **.gg/dirham** in je status te zetten')
		return message.reply({ embeds: [embed]})
	}


	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	if (cmd.length == 0) return;
	let command = client.commands.get(cmd)
	if (!command) command = client.commands.get(client.aliases.get(cmd));


	if (command) {
		if (command.cooldown) {
			if (cooldown.has(`${command.name}${message.author.id}`)) return message.channel.send({ content: config.messages["COOLDOWN_MESSAGE"].replace('<duration>', ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })) });
			if (command.userPerms || command.botPerms) {
				if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
					const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
						.setColor('Red')
					return message.reply({ embeds: [userPerms] })
				}
				if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
					const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
						.setColor('Red')
					return message.reply({ embeds: [botPerms] })
				}
			}

			command.run(client, message, args)
			cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
			setTimeout(() => {
				cooldown.delete(`${command.name}${message.author.id}`)
			}, command.cooldown);
		} else {
			if (command.userPerms || command.botPerms) {
				if (!message.member.permissions.has(PermissionsBitField.resolve(command.userPerms || []))) {
					const userPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, You don't have \`${command.userPerms}\` permissions to use this command!`)
						.setColor('Red')
					return message.reply({ embeds: [userPerms] })
				}

				if (!message.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.botPerms || []))) {
					const botPerms = new EmbedBuilder()
						.setDescription(`🚫 ${message.author}, I don't have \`${command.botPerms}\` permissions to use this command!`)
						.setColor('Red')
					return message.reply({ embeds: [botPerms] })
				}
			}
			command.run(client, message, args)
		}
	}

});