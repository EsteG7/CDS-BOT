const { MESSAGES } = require("../../util/constants");
const { STREAMING, AMONGUS_RUNNING } = require("../../data/emojis.json");

module.exports.run = (client, message, args) => {
    let customMsg = [
        `_Ma latance est suffisament faible pour jouer à Among Us_ ${AMONGUS_RUNNING}`,
        `_Ma latance est suffisament faible pour jouer à TF2_ `,
        `_Je n'ai pas de lag, je peux regarder mon stream_ ${STREAMING}`
    ];
    let customMsgNumber = Math.floor(Math.random() * customMsg.length);

    message.channel.send("Pinging...").then(m =>{
        let ping = m.createdTimestamp - message.createdTimestamp;
        m.edit(ping < 750 ? `Pong! ${ping}ms. ${customMsg[customMsgNumber]}` : `Pong! ${ping}ms. Mon ping est mauvais :cry:`);
    });
}

module.exports.help = MESSAGES.COMMANDS.MISC.PING;