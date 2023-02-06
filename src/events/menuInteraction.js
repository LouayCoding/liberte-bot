const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const client = require('..');

client.on('interactionCreate', async interaction => {
	if (!interaction.isStringSelectMenu() || !interaction.isChannelSelectMenu() || !interaction.isRoleSelectMenu()) return;


    const menu = client.menus.get(interaction.customId);
    if (!menu) return;

    try {
        if(menu.permissions) {
            if(!interaction.memberPermissions.has(PermissionsBitField.resolve(menu.permissions || []))) {
                const perms = new EmbedBuilder()
                .setDescription(`🚫 ${interaction.user}, You don't have \`${menu.permissions}\` permissions to interact this button!`)
                .setColor('Red')
                return interaction.reply({ embeds: [perms], ephemeral: true })
            }
        }
        await menu.run(client, interaction);
    } catch (error) {
        interaction.reply({ content: 'Er is een fout opgetreden!', ephemeral: true});
        console.log(error);
    }
});