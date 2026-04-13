const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('Support')
  .setDescription('This is our support server! Overcold+! Click [here](https://discord.gg/EDmKXYdvx6) to join')
  .setColor("#7f7fff")
  .setTimestamp()
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "support",
  desc: "Invite link to support server."
}