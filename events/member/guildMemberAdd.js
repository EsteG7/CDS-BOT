const { CORNFLOWER_BLUE} = require('../../data/colors.json');
const { MessageEmbed } = require("discord.js");
const { CHANNEL } = require('../../config');

module.exports = async (client, member) => {
    const embed = new MessageEmbed()
    .setColor(CORNFLOWER_BLUE)
    .setTitle(`Nouveau membre`)
    .setDescription(`<@${member.id}>`)
    .addField("ID", member.id);

    client.channels.cache.get(CHANNEL.WELCOME).send({embeds: [embed]});
}