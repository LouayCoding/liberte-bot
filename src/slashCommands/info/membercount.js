const { EmbedBuilder, ActionRowBuilder, Events, StringSelectMenuBuilder, ChannelSelectMenuBuilder, ChannelType, RoleSelectMenuBuilder, MentionableSelectMenuBuilder, UserSelectMenuBuilder } = require('discord.js');

module.exports = {
    name: 'membercount',
    description: "Verkrijg de server leden count",
    run: async (client, interaction) => {
        
        const row = new ActionRowBuilder()
			.addComponents(
				new UserSelectMenuBuilder()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.setMinValues(1)
					.setMaxValues(1)
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
    }
};