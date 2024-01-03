const economy = async (interaction) => {

    let guild = client.eco.cache.guilds.get({
		guildID: interaction.guild.id
	});

	let user = client.eco.cache.users.get({
		memberID: interaction.member.id,
		guildID: interaction.guild.id
	});



	const userID = interaction.options.getUser('gebruiker')?.id;

	let argumentUser = client.eco.cache.users.get({
		memberID: userID,
		guildID: interaction.guild.id
	})

	if (userID && !argumentUser) {
        argumentUser = await eco.users.create(userID, interaction.guild.id)
    }


	const shop = client.eco.cache.shop.get({
		guildID: interaction.guild.id
	}) || []

	const inventory = client.eco.cache.inventory.get({
		guildID: interaction.guild.id,
		memberID: user
	}) || []

	const history = client.eco.cache.history.get({
		guildID: interaction.guild.id,
		memberID: user
	}) || []

	if (!guild) {
		guild = await client.eco.guilds.create(interaction.guild.id)
	}

	if (!user) {
		const ecoUser = await client.eco.users.get(user, interaction.guild.id)

		if (ecoUser) {
			client.eco.cache.users.update({
				guildID: interaction.guild.id,
				memberID: user
			})

			user = ecoUser
			return
		}

		user = await guild.users.create(user)
	}
    
    
}

module.exports = { economy }