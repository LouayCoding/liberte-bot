const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const { primaryColor } = require('../../config');
let embed;

module.exports = {
    name: 'minecraft',
    description: "Beheer Minecraft server commando's",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'server',
            description: 'Beheer de Minecraft server',
            type: ApplicationCommandOptionType.SubcommandGroup,
            options: [
                {
                    name: 'start',
                    description: 'Start de Minecraft server',
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: 'stop',
                    description: 'Stop de Minecraft server',
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: 'restart',
                    description: 'Herstart de Minecraft server',
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: 'kill',
                    description: 'Forceer het stoppen van de Minecraft server',
                    type: ApplicationCommandOptionType.Subcommand,
                },
                {
                    name: 'status',
                    description: 'Controleer de status van de Minecraft-server',
                    type: ApplicationCommandOptionType.Subcommand,
                },
            ]
        }
    ],
    run: async (client, interaction) => {
        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case 'start':
                await sendServerCommand('start');
                break;
            case 'stop':
                await sendServerCommand('stop');
                break;
            case 'restart':
                await sendServerCommand('restart');
                break;
            case 'kill':
                await sendServerCommand('kill');
            case 'status':
                await checkServerStatus();
                break;
        }

        async function sendServerCommand(command) {
            const apiKey = 'ptlc_aZG6otUeZipj7G1IPuITDdVahOVEHYaps9lpMH2zRbY';

            try {
                const response = await axios.post(
                    `https://panel.pokecord.net/api/client/servers/d1b804e0/power`,
                    { "signal": `${command}` },
                    {
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log(`Server ${command} command sent:`, response.data);
                embed = new EmbedBuilder()
                    .setDescription(`Minecraft server **${command}** commando verzonden.`)
                    .setColor(primaryColor)

                await interaction.reply({ embeds: [embed] });
            } catch (error) {
                console.error(`Error sending server ${command} command:`, error);
                await interaction.reply({ content: `Er is een fout opgetreden bij het verzenden van het ${command} commando.`, ephemeral: true });
            }
        }

        async function checkServerStatus() {
            const serverIp = '188.40.142.34';
            const serverPort = '3500';

            try {
                const response = await axios.get(`https://api.mcsrvstat.us/2/${serverIp}:${serverPort}`);
                const serverData = response.data;

                if (serverData.online) {
                    const embed = new EmbedBuilder()
                        .setColor(primaryColor)
                        .setTitle('Minecraft Server Status')
                        .addFields(
                            { name: 'Server IP', value: serverIp },
                            { name: 'Players Online', value: `${serverData.players.online}/${serverData.players.max}`, inline: true },
                            // Add more fields as needed
                        );

                    await interaction.reply({ embeds: [embed] });
                } else {
                    await interaction.reply('The Minecraft server is currently offline.');
                }
            } catch (error) {
                console.error('Error fetching server statistics:', error);
                await interaction.reply('Could not fetch server statistics.');
            }
        }
    }
};
