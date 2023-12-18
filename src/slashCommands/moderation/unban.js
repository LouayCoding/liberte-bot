const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { checkMod } = require('../../utils/permissions');
const { logChannelId } = require('../../config');

module.exports = {
    name: 'unban',
    description: "Heft de ban van een gebruiker op.",
    options: [
        {
            name: 'gebruiker',
            description: 'De ID van de gebruiker waarvan je de ban wilt opheffen.',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'reden',
            description: 'Reden voor het opheffen van de ban.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const userId = interaction.options.getString('gebruiker');
        const reason = interaction.options.getString('reden') || 'Geen reden';

        try {
            // Controleer of de gebruiker in de banlijst staat
            const bans = await interaction.guild.bans.fetch();
            const isBanned = bans.some(ban => ban.user.id === userId);

            if (!isBanned) {
                return interaction.reply({ content: 'Deze gebruiker staat niet in de banlijst.', ephemeral: true });
            }

            const targetUser = await client.users.fetch(userId);
            const instantEmbed = new EmbedBuilder()
                .setColor('ff0000')
                .setAuthor({ name: `${targetUser.tag}, is unbanned!`, iconURL: targetUser.displayAvatarURL() });

            const logChannel = interaction.guild.channels.cache.get(logChannelId);

            if (logChannel) {
                await logChannel.send({ embeds: [instantEmbed] });
            } else {
                console.log('Logkanaal niet gevonden');
            }

            await interaction.guild.members.unban(targetUser, reason);
            await interaction.reply({ embeds: [instantEmbed] });
        } catch (error) {
            console.error(error);
            return interaction.reply({ content: 'Er is een fout opgetreden bij het opheffen van de ban.', ephemeral: true });
        }
    },
};
