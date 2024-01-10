const { ApplicationCommandType, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandOptionType } = require('discord.js');
const { createCanvas } = require('canvas');

module.exports = {
    name: 'tree',
    description: "Bekijk hoe simp iemand is",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,

    run: async (client, interaction) => {
        // Fetch the first 10 members of the guild
        const members = await interaction.guild.members.fetch({ limit: 10 });
        const memberArray = Array.from(members.values()); // Convert to array for easier indexing

        // Create canvas
        const canvas = createCanvas(800, 600);
        const ctx = canvas.getContext('2d');

        // Set up some styles
        ctx.fillStyle = '#FFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#000';
        ctx.textAlign = 'center';

        // Function to draw a member node
        function drawMember(member, x, y) {
            ctx.fillText(`${member.user.username}#${member.user.discriminator}`, x, y);
            ctx.beginPath();
            ctx.arc(x, y + 20, 20, 0, Math.PI * 2, true); // Draw a circle for the member
            ctx.stroke();
        }

        // Function to draw a line between members
        function connectMembers(x1, y1, x2, y2) {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        // Calculate positions and draw each member
        let levelDistance = 100; // Vertical distance between levels
        let siblingDistance = 70; // Horizontal distance between siblings
        let startX = canvas.width / 2;
        let startY = 30;

        for (let i = 0; i < memberArray.length; i++) {
            let member = memberArray[i];
            let x = startX - ((memberArray.length / 2 - i) * siblingDistance);
            let y = startY + (i * levelDistance);
            drawMember(member, x, y);

            // Connect each member to their "parent"
            if (i > 0) {
                let parentIndex = Math.floor((i - 1) / 2);
                let parentX = startX - ((memberArray.length / 2 - parentIndex) * siblingDistance);
                let parentY = startY + (parentIndex * levelDistance);
                connectMembers(x, y, parentX, parentY + 40); // Connect to the bottom of the parent's circle
            }
        }

        // Create the attachment and send the message
        const attachment = new AttachmentBuilder(canvas.toBuffer(), { name: 'family-tree.png' });
        await interaction.reply({ files: [attachment] });
    }
};
