const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ChannelType, EmbedBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require('discord.js');
const { ticketCategoryId, vrouwenRol, succesColor, adminRole } = require('../../config');

module.exports = {
    id: 'unban',
    permissions: [],
    run: async (client, interaction) => {
        const admin = interaction.guild.roles.cache.get(adminRole).position;
        const highestRole = interaction.member.roles.highest.position;

        if (highestRole <= admin) return interaction.reply({ content: 'Je bent niet bevoegd om deze functie te gebruiken', ephemeral: true })

        const userId = interaction.customId.split('-')[1];
        try {
            await interaction.guild.bans.remove(userId);
            const unbanUser = await client.users.fetch(userId); // Haal de User op
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: `${unbanUser.tag} is unbanned!`,
                    iconURL: unbanUser.displayAvatarURL() // Gebruik de avatar URL van de User
                })
                .setColor(succesColor);
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            // Als de gebruiker niet gebanned is, stuur een foutmelding
            if (error.message === "Unknown Ban") {
                interaction.reply({ content: "De gebruiker is momenteel niet gebanned.", ephemeral: true });
            } else {
                // Verwerk andere soorten fouten
                console.error("Er is een fout opgetreden: ", error);
                interaction.reply({ content: "Er is een fout opgetreden bij het uitvoeren van dit commando.", ephemeral: true });
            }
        }

    }
}