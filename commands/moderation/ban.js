const colors = require('../../data/colors.json');
const { MESSAGES } = require('../../util/constants');
const { Permissions } = require('discord.js');

module.exports.run = (client, message, args) => {
    // -- test si user a le droit de ban
    if (!message.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return message.reply("Tu n'as pas le droit de ban !")

    // façon plus courte ? a voir
    /* message.guild.members.ban(message.mentions.members.first() || args.slice(0).join(""))
        .then(banInfo => console.log(`Banned ${banInfo.user?.tag ?? banInfo.tag ?? banInfo}`))
        .catch(console.error); */

    let memberToBan = message.mentions.members.first();
    let memberToBanId = memberToBan ? memberToBan.id : args.slice(0).join("");

    if (!memberToBanId) 
        return message.reply('Veuillez spécifier un membre ou son ID.');

    if (memberToBan) {
        module.exports.ban(message, memberToBan);
    } else if (memberToBanId) {
        // recupere d'abord le membre (s'il existe) pour le ban ensuite
        message.guild.members.fetch(memberToBanId)
        .then(m => module.exports.ban(message, m))
        .catch(err => message.reply('> ' + memberToBanId + ' n\'existe pas ou n\'est pas ou plus sur le serveur !'));
    }
}

module.exports.ban = (message, member) => {
    if (!member.bannable) return message.reply('> Impossible de ban ' + member.displayName + ' !');
        
    console.log("Ban membre", member.displayName);
    member.ban()
        .then(m => message.channel.send(`> 👋 ${m.displayName} a été banni ! ⛔`))
        .catch(err => message.reply('> Erreur, impossible de ban ' + member.displayName + ' !'));
}

module.exports.help = MESSAGES.COMMANDS.MODERATION.BAN;