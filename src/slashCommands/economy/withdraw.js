const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

module.exports = {
    name: 'withdraw',
    description: "Neem geld op van je saldo binnen de economiemodule.",
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
        let user = client.eco.cache.users.get({ memberID: interaction.member.id, guildID: interaction.guild.id });
        const userBankBalance = await user.bank.get()
        const amount = amountString == 'all' ? userBalance : parseInt(amountString)

        if (userBankBalance < amount || !userBankBalance) {
            return interaction.reply({ content: `Je hebt niet genoeg euro op je bankrekening om deze opname uit te voeren.`, ephemeral: true })
        }

        await user.bank.subtract(amount, `Opname: ${amount} euro`)
        await user.balance.add(amount, `Opname: ${amount} euro`)

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.member}, je hebt **${amount} euro** opgenomen van je bank.`)
            .setColor('5865F2');

        interaction.reply({ embeds: [embed]})

    }
};
