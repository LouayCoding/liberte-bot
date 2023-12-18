const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

module.exports = {
    name: 'deposit',
    description: "Geef iemand een knuffel",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "aantal",
            description: "De tijd dat de gebruiker getimeout moet worden (bijv. 1d, 2h, 10m).",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const amountString = interaction.options.getString('aantal')
        const getUser = userID => client.users.cache.get(userID)

        let user = client.eco.cache.users.get({ memberID: interaction.member.id, guildID: interaction.guild.id });
        const userBalance = await user.balance.get()
        const amount = amountString == 'all' ? userBalance : parseInt(amountString)

        if (userBalance < amount || !userBalance) {
            return interaction.reply({ content: `Je hebt niet genoeg euro om deze storting uit te voeren.`, ephemeral: true })
        }

        await user.balance.subtract(amount, `Gestort: ${amount} euro`)
        await user.bank.add(amount, `Gestort: ${amount} euro`)

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.member}, je hebt **${amount} euro** op je bank gestort.`)
            .setColor('5865F2');

        interaction.reply({ embeds: [embed]})

    }
};
