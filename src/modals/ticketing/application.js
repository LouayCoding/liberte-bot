const { EmbedBuilder } = require('@discordjs/builders');
const { applicationChannelId } = require('../../config');

module.exports = {
    id: 'applicationModal',
    permissions: [],
    run: async (client, interaction) => {
        const name = interaction.fields.getTextInputValue('nameInput');
        const active = interaction.fields.getTextInputValue('ageInput');
        const motivation = interaction.fields.getTextInputValue('experienceInput');

        const channel = await interaction.guild.channels.fetch(applicationChannelId);
        if (!channel) return interaction.reply({ content: "Er is een fout opgetreden.", ephemral: true });

        const embed = new EmbedBuilder()
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() })
            .addFields(
                { name: 'Naam', value: name, inline: false },
                { name: 'Leeftijd', value: active, inline: false },
                { name: 'Motivatie', value: motivation, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: 'Liberté' })
        channel.send({ embeds: [embed] });
        interaction.reply({ content: 'Je sollicitatie is succesvol verzonden.', ephemeral: true });

    }
};