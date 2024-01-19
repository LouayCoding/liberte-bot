const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'money',
    description: "Beheer gebruikerssaldo binnen de economiemodule.",
    options: [
        {
            name: "add",
            description: "Voegt een specifiek bedrag toe aan het saldo van een gebruiker binnen de economiemodule.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'De gebruiker waarvan het saldo moet worden aangepast.',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
                {
                    name: "aantal",
                    description: "Het bedrag dat aan het saldo moet worden toegevoegd.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ]
        },
        {
            name: "remove",
            description: "Trekt een specifiek bedrag af van het saldo van een gebruiker binnen de economiemodule.",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'De gebruiker waarvan het saldo moet worden aangepast.',
                    type: ApplicationCommandOptionType.User,
                    required: true,
                },
                {
                    name: "aantal",
                    description: "Het bedrag dat van het saldo moet worden afgetrokken.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                },
            ]
        },
    ],

    run: async (client, interaction) => {
        if (interaction.options.getSubcommand() === 'add') {
            let argumentUser = client.eco.cache.users.get({
                memberID: interaction.options.getUser('gebruiker')?.id,
                guildID: interaction.guild.id
            });



            if (!argumentUser) {
                return interaction.reply({ content: `Gebruiker niet gevonden.`, ephemeral: true })
            }

            const amount = parseInt(interaction.options.getString('aantal'));

            if (isNaN(amount)) {
                return interaction.reply({ content: `Graag een geldig bedrag opgeven.`, ephemeral: true })
            }

            await argumentUser.balance.add(amount)

            const embed = new EmbedBuilder()
                .setDescription(`Je hebt succesvol **€ ${amount}** toegevoegd aan het saldo van ${interaction.options.getUser('gebruiker')}.`)
                .setColor('5865F2');

            interaction.reply({ embeds: [embed] })
        } else if (interaction.options.getSubcommand() === 'remove') {

            let argumentUser = client.eco.cache.users.get({
                memberID: interaction.options.getUser('gebruiker')?.id,
                guildID: interaction.guild.id
            });

            if (!argumentUser) {
                return interaction.reply({ content: `Gebruiker niet gevonden.`, ephemeral: true })
            }

            const userBalance = await argumentUser.balance.get() || 0
            const amount = interaction.options.getString('aantal') == 'all' ? userBalance : parseInt(interaction.options.getString('aantal'))

            if (isNaN(amount)) {
                return interaction.reply({ content: `Graag een geldig bedrag opgeven.`, ephemeral: true })
            }

            await argumentUser.balance.subtract(amount)

            const embed = new EmbedBuilder()
                .setDescription(`Je hebt succesvol **€ ${amount}** verwijderd van het saldo van ${interaction.options.getUser('gebruiker')}.`)
                .setColor('5865F2');

            interaction.reply({ embeds: [embed] })
        }

    }
};
