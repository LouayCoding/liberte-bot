const { ApplicationCommandOptionType, EmbedBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { checkMod } = require('../../utils/permissions');
const { logChannelId, dangerColor } = require('../../config');
const { ButtonBuilder } = require('discord-gamecord/utils/utils');

module.exports = {
    name: 'ban',
    description: "Verbant een gebruiker van de server.",
    options: [
        {
            name: 'gebruiker',
            description: 'De gebruiker die verbannen moet worden.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'reden',
            description: 'Reden voor de ban.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const modCheck = await checkMod(interaction);

        if (!modCheck.allowed) {
            return interaction.reply({ content: modCheck.reason, ephemeral: true });
        }

        const targetUser = interaction.options.getUser('gebruiker');
        const reason = interaction.options.getString('reden') || 'Geen reden';

        try {

            const unbanButton = new ButtonBuilder().setCustomId(`unban-${targetUser.id}`).setLabel('Unban').setStyle(ButtonStyle.Secondary);
            const row = new ActionRowBuilder().addComponents(unbanButton);

            const logEmbed = new EmbedBuilder()
                .setColor(dangerColor)
                .setAuthor({ name: `[BAN] ${targetUser.tag}`, iconURL: targetUser.displayAvatarURL() })
                .addFields(
                    { name: 'Gebruiker', value: targetUser.tag, inline: true },
                    { name: 'Moderator', value: interaction.user.tag, inline: true },
                    { name: 'Reden', value: reason, inline: true },
                )
                .setFooter({ text: `ID: ${targetUser.id}` });

            const logChannel = interaction.guild.channels.cache.get(logChannelId);
            if (logChannel) {
                await logChannel.send({ embeds: [logEmbed], components: [row] });
            } else {
                console.log('Logkanaal niet gevonden');
            }

            // Attempt to send a DM to the target user
            try {
                await targetUser.send({ embeds: [logEmbed] });
            } catch (dmError) {
                
            }

            // Proceed with banning the user
            await interaction.guild.members.ban(targetUser, { reason: reason });

            const embed = new EmbedBuilder().setAuthor({ name: `${targetUser.tag} is verbannen`, iconURL: `${targetUser.displayAvatarURL()}`}).setDescription(`**Reden:** ${reason}`).setColor(dangerColor).setFooter({ text: `ID: ${targetUser.id}` });
            await interaction.reply({ embeds: [embed], components: [row] });
        } catch (error) {
            console.error(`Error in ban command: ${error}`);
            await interaction.reply({ content: 'Er is een fout opgetreden bij het verbannen van de gebruiker.', ephemeral: true });
        }
    }
};
