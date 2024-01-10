
const { ticketCategoryId, primaryColor } = require('../../config');
const { ChannelType, PermissionFlagsBits, ButtonStyle, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    id: 'minecraft',
    permissions: [],
    run: async (client, interaction) => {
        const username = interaction.fields.getTextInputValue('username');


        const channel = await interaction.guild.channels.create({
            name: interaction.user.username,
            type: ChannelType.GuildText,
            parent: ticketCategoryId,
            permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [PermissionFlagsBits.ViewChannel],
                },
                {
                    id: '1145426344969257040',
                    deny: [PermissionFlagsBits.ViewChannel],
                },
            ],
            // your permission overwrites or other options here
        });

        interaction.reply({ content: `Ticket kanaal is aangemaakt in ${channel}.`, ephemeral: true });

        const embed = new EmbedBuilder()
            .setColor('#8c8b86')
            .setAuthor({ name: 'Minecraft whitelist', iconURL: interaction.user.displayAvatarURL() })
            .addFields(
                { name: 'Username', value: `${username}` })
            .setDescription(`Hi ${interaction.user}, een moderator komt je zo snel mogelijk helpen.`)


        const close = new ButtonBuilder()
            .setCustomId('sluiten')
            .setLabel('Sluiten')
            .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder()
            .setComponents(close)

        const bericht = await channel.send({ content: `${interaction.user}` });
        await bericht.delete();
        await channel.send({ embeds: [embed], components: [row] })

    }
};