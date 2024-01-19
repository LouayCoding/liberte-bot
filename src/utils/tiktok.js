const urlRegex = require('url-regex-safe');
const { execFile } = require('child_process');
const client = require('..');
const YTDlpWrap = require("yt-dlp-wrap").default;
const ytDlpWrap = new YTDlpWrap('yt-dlp');
const filesizeLimit = {
    default: 25 * 1024 * 1024 - 1000, // reserve 1KB for the message body
    tier2: 50 * 1024 * 1024 - 1000,
    tier3: 100 * 1024 * 1024 - 1000
};
const path = require('path');

console.log(path.join(__dirname, '..', 'yt-dlp.exe'))
let cooldown_users = new Set();
let supress_embeds = new Set();


const tiktok = async (message, url) => {

    let found_match = false;
    if (/(www\.tiktok\.com)|(vm\.tiktok\.com)/.test(url)) {
        cooldown_users.add(message.author.id);
        found_match = true;
        message.channel.sendTyping().catch(console.error);

        get_tiktok_data(url).then(tiktok_data => {
            let too_large = is_too_large_attachment(message.guild, tiktok_data);
            if (too_large && !'1181783435832995920')  
                report_filesize_error(message);
            else if (too_large)
                client.channels.fetch('1181783435832995920').then(channel => {
                    if (is_too_large_attachment(channel.guild, tiktok_data))
                        report_filesize_error(message);
                    else
                        channel.send({ files: [{ attachment: tiktok_data, name: `${Date.now()}.mp4` }] }).then(boosted_message =>
                            message.reply({ content: boosted_message.attachments.first().attachment, allowedMentions: { repliedUser: false } })
                                .catch(console.error)) 
                            .catch(console.error);
                }).catch(() => report_filesize_error(message))
            else
                message.reply({ files: [{ attachment: tiktok_data, name: `${Date.now()}.mp4` }], allowedMentions: { repliedUser: false } })
                    .catch(console.error)
        })
            .catch(err => report_error(message, err));  
    }



    if (found_match) {
        
        if (message.embeds.length) {
            if (message.guild.members.me.permissionsIn(message.channel).has('ManageMessages'))
                message.suppressEmbeds().catch(console.error);
        }
        else
            supress_embeds.add(message.id);

        (async (id = message.id) => {
            await new Promise(x => setTimeout(x, 10000));
            supress_embeds.delete(id);
        })();

        
        (async (id = message.author.id) => {
            await new Promise(x => setTimeout(x, 10000));
            cooldown_users.delete(id);
        })();
    }


    client.on('messageUpdate', (old_message, new_message) => {
        if (!supress_embeds.has(new_message.id))
            return;

        //if one or more embeds appeared in this message update
        if (!old_message.embeds.length && new_message.embeds.length) {
            if (new_message.guild.members.me.permissionsIn(new_message.channel).has('ManageMessages'))
                new_message.suppressEmbeds().catch(console.error);
            supress_embeds.delete(new_message.id);
        }
    });

    function get_tiktok_data(url) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            ytDlpWrap.execStream([url, "-f", "best[vcodec!=h265]/best"])
                .on("data", (data) => chunks.push(data))
                .on("end", () => resolve(Buffer.concat(chunks)))
                .on("error", (err) => reject(err));
        });
    }

    function is_too_large_attachment(guild, stream) {
        let limit = 0;
        if (!guild)
            limit = filesizeLimit.default;
        else {
            switch (guild.premiumTier) {
                default:
                case 1:
                    limit = filesizeLimit.default;
                    break;
                case 2:
                    limit = filesizeLimit.tier2;
                    break;
                case 3:
                    limit = filesizeLimit.tier3;
                    break;
            }
        }
        return stream.length >= limit;
    }

    function report_error(message, error) {
        message.reply({ content: `Error on trying to download this TikTok:\n\`${error}\``, allowedMentions: { repliedUser: false } }).catch(console.error);
    }

    function report_filesize_error(message) {
        message.reply({ content: 'This TikTok exceeds the file size limit Discord allows :*(', allowedMentions: { repliedUser: false } }).catch(console.error);
    }

};

module.exports = { tiktok };
