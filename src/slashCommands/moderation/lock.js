const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'lock',
    description: "Ontgrendel een specifiek kanaal.",
    options: [
        {
            name: 'kanaal',
            description: 'Het kanaal dat vergrendeld moet worden.',
            type: ApplicationCommandOptionType.Channel,
            required: false,
        },
    ],
    run: async (client, interaction) => {
        let targetChannel = interaction.options.getChannel('kanaal');

        // Als er geen kanaal is opgegeven, ontgrendel dan het huidige kanaal
        if (!targetChannel) {
            targetChannel = interaction.channel;
        }

        try {
            await targetChannel.permissionOverwrites.set([
                {
                    id: interaction.guild.id,
                    deny: [PermissionsBitField.Flags.SendMessages]
                }
            ]);

            const embed = new EmbedBuilder()
                .setDescription(`Het kanaal ${targetChannel} is vergrendeld.`)
                .setColor('#5865F2');

            await interaction.reply({
                embeds: [embed],
            });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: "Er is een fout opgetreden bij het vergrendelen van het kanaal.", ephemeral: true });
        }
    }
};
