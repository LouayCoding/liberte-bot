const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, PermissionsBitField } = require('discord.js');


module.exports = {
    id: 'report',
    permissions: [],
    run: async (client, interaction) => {
        const channelLimit = await ticketLimit(interaction);
        if (channelLimit) return interaction.reply({ content: `Je hebt al een openstaande ticket in ${channelLimit}.`, ephemeral: true })

        const channelId = client.config.ticket.category;
        const name = interaction.fields.getTextInputValue('name');
        const reason = interaction.fields.getTextInputValue('reason');

        const category = await channelExists(channelId, interaction);
        if (!category) return interaction.reply({ content: 'Er is een fout opgetreden.', ephemeral: true });

        const channel = await createTicket(category, interaction);
        if (!channel) return interaction.reply({ content: 'Er is een fout opgetreden!', ephemeral: true });

        interaction.reply({ content: `Ik heb een ticket voor je aangemaakt in ${channel}.`, ephemeral: true });


        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('close')
                    .setLabel('Sluiten')
                    .setEmoji('🔒')
                    .setStyle(ButtonStyle.Danger),
            );

        const embed = new EmbedBuilder()
            .setAuthor({ name: `Ticket - ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
            .setDescription(`Bedankt voor het openen van een ticket, ${interaction.user}. Een moderator zal u zo snel mogelijk helpen.\n\n**Categorie**: Report\n**Gebruiker:** ${name}\n**Vraag:** ${reason}`)
            .setFooter({ text: client.config.footer })
            .setTimestamp()
            .setColor(client.config.primaryColor)
        await channel.send({ embeds: [embed], components: [row] });

        async function createTicket(category, interaction) {
            const ticketChannel = await interaction.guild.channels.create({
                name: `${interaction.user.tag.replace('#', '-')}`,
                type: 0,
                parent: category,
            });
            await db.set(interaction.user.id, { ticketChannel: ticketChannel.id })
            if (!ticketChannel) return false;
            await ticketChannel.permissionOverwrites.edit(interaction.user.id, {
                SendMessages: true,
                ViewChannel: true,
            })
            return ticketChannel;
        }

        async function channelExists(channelId, interaction) {
            const channel = await interaction.guild.channels.fetch(channelId);
            if (channel) return channel;
            else return false;
        }

        async function ticketLimit(interaction) {
            try {
                const ticketChannel = await db.get(interaction.user.id);
                const dbChannel = ticketChannel?.ticketChannel;
                if (!dbChannel) return false;
                const channel = await interaction.guild.channels.fetch(dbChannel);
                if (channel == dbChannel) return channel;
                else return false;
            } catch (error) {
                return false;
            }
        }
    }
};  