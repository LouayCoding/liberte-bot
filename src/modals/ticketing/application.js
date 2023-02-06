const { EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    id: 'application',
    permissions: [],
    run: async (client, interaction) => {
        const name = interaction.fields.getTextInputValue('name');
        const active = interaction.fields.getTextInputValue('active');
        const motivation = interaction.fields.getTextInputValue('motivation');

        const channel = await interaction.guild.channels.fetch(client.config.applicationChannel);
        if (!channel) return interaction.reply({ content: "Er is een fout opgetreden.", ephemral: true });

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .addFields(
                { name: 'Naam', value: name, inline: false },
                { name: 'Actief', value: active, inline: false },
                { name: 'Motivatie', value: motivation, inline: false }
            )
            .setThumbnail(interaction.user.displayAvatarURL())
            .setTimestamp()
            .setFooter({ text: client.config.footer})
        channel.send({ embeds: [embed] });
        interaction.reply({ content: 'Uw sollicitatie is succesvol verzonden.', ephemeral: true });

    }
};