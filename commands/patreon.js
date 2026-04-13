const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('Patreon')
  .setDescription('This is our Patreon page! Click [here](https://patreon.com/beycord).')
  .setColor("#FFD700")
  .setTimestamp()
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "patreon",
  desc: "Patreon page for Beycord+."
}