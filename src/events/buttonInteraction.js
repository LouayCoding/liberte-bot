const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const client = require('..');

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId);
    if (!button) return;

    try {
        if (button.permissions) {
            if (!interaction.memberPermissions.has(PermissionsBitField.resolve(button.permissions || []))) {
                const perms = new EmbedBuilder()
                    .setDescription(`🚫 ${interaction.user}, You don't have \`${button.permissions}\` permissions to interact this button!`)
                    .setColor('Red')
                return interaction.reply({ embeds: [perms], ephemeral: true })
            }
        }
        return await button.run(client, interaction);
    } catch (error) {
        interaction.reply({ content: 'Er is een fout opgetreden!', ephemeral: true });
        console.log(error);
    }

    interaction.reply({ content: 'Button is niet beschikbaar!', ephemeral: true })
});