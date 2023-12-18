const { ApplicationCommandOptionType, EmbedBuilder, embedLength } = require('discord.js');
const { checkMod } = require('../../utils/permissions');
const { logChannelId } = require('../../config');
const ems = require("enhanced-ms");

module.exports = {
    name: 'timeout',
    description: "Timeout een gebruiker in de server.",
    options: [
        {
            name: 'gebruiker',
            description: 'De gebruiker die getimeout moet worden.',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "duur",
            description: "De tijd dat de gebruiker getimeout moet worden (bijv. 1d, 2h, 10m).",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'reden',
            description: 'Reden voor de timeout.',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    run: async (client, interaction) => {
        const targetUser = interaction.options.getUser('gebruiker');
        const target = interaction.options.getMember('gebruiker');
        const reason = interaction.options.getString('reden') || 'Geen reden';
        const duur = interaction.options.getString('duur') || 'Geen reden';

        const ms = ems(duur);
        if (!ms) return interaction.reply("Gelieve een geldige tijdsduur op te geven. Voorbeeld: 1d/1u/1m/1s.");
        target.timeout(ms, reason).then(console.log).catch(console.error);
      
        try {
            const instantEmbed = new EmbedBuilder()
                .setColor('5865F2')
                .setAuthor({ name: `${targetUser.tag}, is getimeout!`, iconURL: targetUser.displayAvatarURL() });

            const logEmbed = new EmbedBuilder()
                .setColor('5865F2')
                .setAuthor({ name: `[TIMEOUT] ${targetUser.tag}`, iconURL: targetUser.displayAvatarURL() })
                .addFields(
                    { name: 'Gebruiker', value: targetUser.tag, inline: true },
                    { name: 'Moderator', value: interaction.user.tag, inline: true },
                    { name: 'Duur', value: duur, inline: true },
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
        } catch (error) {
            console.log(error);

        }
    }
};
