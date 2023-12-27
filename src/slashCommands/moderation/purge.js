const { ApplicationCommandOptionType, Permissions } = require('discord.js');

module.exports = {
    name: 'purge',
    description: "Verwijder een aantal berichten in een kanaal.",
    options: [
        {
            name: 'aantal',
            description: 'Het aantal berichten dat moet worden verwijderd.',
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
    ],
    run: async (client, interaction) => {
        const numberOfMessagesToDelete = interaction.options.getInteger('aantal');



        try {
            const messages = await interaction.channel.messages.fetch({ limit: numberOfMessagesToDelete + 1 });

            if (messages.size <= 1) {
                return interaction.reply({ content: "Er zijn geen berichten om te verwijderen.", ephemeral: true });
            }

            await interaction.channel.bulkDelete(messages, true);

            interaction.reply({ content: `**${numberOfMessagesToDelete}** berichten zijn verwijderd.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "Er is een fout opgetreden bij het verwijderen van berichten.", ephemeral: true });
        }
    }
};
