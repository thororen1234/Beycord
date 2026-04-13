const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Known Bugs')
  .setDescription('Below is a list of all the known bugs as of **July 10, 2021.** ```\n[1];purchase has problems for some items.``` ```\n[2]quests are disabled...for now.``` ```\n[3]spawn aint up bub.``` ```\n[4]rarities are limited to exclusives as of now and will be fixed.```')
  .setColor("#7f7fff")
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "knownbugs"
}