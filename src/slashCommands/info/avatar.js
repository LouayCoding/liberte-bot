const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType, ActionRowBuilder, ButtonStyle, ButtonBuilder, ComponentType } = require('discord.js');
const { primaryColor } = require('../../config');

module.exports = {
    name: 'avatar',
    description: "Display user's avatar",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    options: [
        {
            name: 'get',
            description: 'Haalt de avatar van een gebruiker op',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'Gebruiker van wie de avatar moet worden opgehaald',
                    type: ApplicationCommandOptionType.User
                }
            ]
        },
        {
            name: 'server',
            description: 'Haalt de serveravatar van een gebruiker op, als deze er een heeft',
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'gebruiker',
                    description: 'Gebruiker van wie de avatar moet worden opgehaald',
                    type: ApplicationCommandOptionType.User
                }
            ]
        },
    ],
    run: async (client, interaction) => {
        const command = interaction.options.getSubcommand();
        const member = interaction.options.get('gebruiker')?.member || interaction.member;
        const user = interaction.options.get('gebruiker')?.user || interaction.user;
        let avatar;

        if (command === 'guild') {
            let fetchMember = await interaction.guild.members.fetch(user.id);
            let guildAvatar = fetchMember.avatarURL({ size: 4096, extension: 'png' });
            if (guildAvatar) avatar = guildAvatar;
            else return interaction.reply({ content: `${fetchMember} heeft geen serveravatar.`, ephemeral: true });
        }

        if (command === 'get') {
            avatar = user.displayAvatarURL({ size: 4096, extension: 'png' });
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`avatar`)
                    .setLabel('Avatar')
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                    .setCustomId(`avatarGuild`)
                    .setLabel('Avatar server')
                    .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                    .setCustomId(`banner`)
                    .setLabel('Banner')
                    .setStyle(ButtonStyle.Secondary),
            );

        if (interaction.customId === `avatarGuild_${user.id}`) {
            interaction.replyEdit({ content: 's' })
        }

        const embed = new EmbedBuilder()
            .setTitle(`Avatar ${user.tag}`)
            .setImage(avatar)
            .setColor(primaryColor)

        const message = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

        const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });

        collector.on('collect', async (i) => {
            if (i.user.id === interaction.user.id) {
                if (i.customId === 'avatar') {
                    const guildAvatar = user.displayAvatarURL({ size: 4096, extension: 'png' });

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`avatar`)
                                .setLabel('Avatar')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId(`avatarGuild`)
                                .setLabel('Avatar server')
                                .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                                .setCustomId(`banner`)
                                .setLabel('Banner')
                                .setStyle(ButtonStyle.Secondary),
                        );

                    const embed = new EmbedBuilder()
                        .setTitle(`Avatar ${user.tag}`)
                        .setColor(primaryColor)
                        .setImage(guildAvatar)

                    await i.deferReply();
                    await i.message.edit({ embeds: [embed], components: [row] });
                    await i.deleteReply();
                } else if (i.customId === 'avatarGuild') {
                    const guildAvatar = member.avatarURL({ size: 4096, extension: 'png' });
                    if (!guildAvatar) return i.reply({ content: `${user}, heeft geen server avatar.`, ephemeral: true });

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`avatar`)
                                .setLabel('Avatar')
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId(`avatarGuild`)
                                .setLabel('Avatar server')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                                .setCustomId(`banner`)
                                .setLabel('Banner')
                                .setStyle(ButtonStyle.Secondary),
                        );

                    const embed = new EmbedBuilder()
                        .setTitle(`Avatar ${user.tag}`)
                        .setColor(primaryColor)
                        .setImage(guildAvatar)

                    await i.deferReply();
                    await i.message.edit({ embeds: [embed], components: [row] });
                    await i.deleteReply();

                } else if (i.customId === 'banner') {
                    const userFetch = await user.fetch({ force: true });
                    const userBanner = userFetch.bannerURL({ size: 1024 });
                    if (!userBanner) return i.reply({ content: `${user}, heeft geen server banner.`, ephemeral: true });

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId(`avatar`)
                                .setLabel('Avatar')
                                .setStyle(ButtonStyle.Primary),
                            new ButtonBuilder()
                                .setCustomId(`avatarGuild`)
                                .setLabel('Avatar server')
                                .setStyle(ButtonStyle.Secondary),
                            new ButtonBuilder()
                                .setCustomId(`banner`)
                                .setLabel('Banner')
                                .setDisabled(true)
                                .setStyle(ButtonStyle.Secondary),
                        );

                    const embed = new EmbedBuilder()
                        .setTitle(`Avatar ${user.tag}`)
                        .setColor(primaryColor)
                        .setImage(userBanner)

                    await i.deferReply();
                    await i.message.edit({ embeds: [embed], components: [row] });
                    await i.deleteReply();

                }
            } else {
                return;
            }
        });

        collector.on('end', async collected => {
            try {
                await i.message.delete()
            } catch (error) {

            }
        });




    }
};