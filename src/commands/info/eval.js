const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "eval",
    description: "Voert aangegeven code uit",
    ownerOnly: true, // Zet dit op 'true' om te zorgen dat alleen de bot-eigenaar dit commando kan gebruiken
    run: async (client, message, args) => {
        // Vervang '123456789012345678' met jouw Discord ID
        if (message.author.id !== '935943312815300699') {
            return message.reply("Je hebt geen toegang tot dit commando.");
        }

        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(`\`\`\`xl\n${clean(evaled)}\n\`\`\``);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    },
};

function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203))
                   .replace(/@/g, "@" + String.fromCharCode(8203));
    } else {
        return text;
    }
}
