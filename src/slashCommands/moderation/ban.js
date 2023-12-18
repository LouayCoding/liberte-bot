const { ApplicationCommandOptionType, EmbedBuilder, embedLength } = require('discord.js');
const { checkMod } = require('../../utils/permissions');
const { logChannelId } = require('../../config');

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

        console.log(modCheck)

        if (!modCheck.allowed) {
            return interaction.reply({ content: modCheck.reason, ephemeral: true });
        }

        const targetUser = interaction.options.getUser('gebruiker');
        const reason = interaction.options.getString('reden') || 'Geen reden';

        try {
            const instantEmbed = new EmbedBuilder()
                .setColor('ff0000')
                .setAuthor({ name: `${targetUser.tag}, is verbannen!`, iconURL: targetUser.displayAvatarURL() });

            const logEmbed = new EmbedBuilder()
                .setColor('ff0000')
                .setAuthor({ name: `[BAN] ${targetUser.tag}`, iconURL: targetUser.displayAvatarURL() })
                .addFields(
                    { name: 'Gebruiker', value: targetUser.tag, inline: true },
                    { name: 'Moderator', value: interaction.user.tag, inline: true },
                    { name: 'Reden', value: reason, inline: true },
                )
                .setFooter({ text: `ID: ${targetUser.id}` })


            const logChannel = interaction.guild.channels.cache.get(logChannelId);
            
            if (logChannel) {
                await logChannel.send({ embeds: [logEmbed] });
            } else {
                console.log('Logkanaal niet gevonden');
            }

            await interaction.reply({ embeds: [instantEmbed] });
            await targetUser.send({ embeds: [logEmbed] });

            await interaction.guild.members.ban(targetUser, { reason: reason });
        } catch (error) {
            console.log(error);
            
        }
    }
};
