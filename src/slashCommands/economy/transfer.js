const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Economy = require('discord-economy-super/mongodb');

module.exports = {
    name: 'transfer',
    description: "Maak geld over naar andere gebruikers.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'gebruiker',
            description: 'De gebruiker naar wie het geld moet worden overgemaakt.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "bedrag",
            description: "Het bedrag dat moet worden overgemaakt.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, interaction) => {

        const getUser = userID => client.users.cache.get(userID)

        let user = client.eco.cache.users.get({
            memberID: interaction.member.id,
            guildID: interaction.guild.id
        });

        let argumentUser = client.eco.cache.users.get({
            memberID: interaction.options.getUser('gebruiker')?.id,
            guildID: interaction.guild.id
        });




        const amountString = interaction.options.getString('aantal')

        const sender = user
        const receiver = argumentUser

        const senderBalance = await sender.balance.get();
        const amount = amountString == 'all' ? senderBalance : parseInt(amountString)





        if (!amount) {
            return interaction.reply({ content: `Geef een hoeveelheid euro aan om over te maken.`, ephemeral: true })
        }

        if (senderBalance < amount) {
            return interaction.reply({ content: `Je hebt niet genoeg euro om deze overdracht uit te voeren.`, ephemeral: true })
        }

        const transferingResult = await receiver.balance.transfer({
            amount,
            senderMemberID: interaction.member.id,
            sendingReason: `transfered ${amount} coins to ${getUser(argumentUser.username)}.`,
            receivingReason: `received ${amount} coins from ${interaction.member.username}.`
        })

        const embed = new EmbedBuilder()
            .setDescription(`${interaction.member}, je hebt **${transferingResult.amount} euro** overgemaakt naar ${interaction.options.getUser('gebruiker')}.`)
            .setColor('5865F2');

        interaction.reply({ embeds: [embed] })

    }
};
