const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('Information')
  .setDescription('In the early days, Beycord was sponsored by [Stardust.](https://stardust.gg/)')
  .setColor("#7f7fff")
  .addFields(
    { name: 'Author of Beycord', value: 'SunSOG/Whizzie'},
    { name: 'Version of Beycord', value: 'Beycord+'}
)
  .setTimestamp()
  .setFooter('Thank you to StarDust for making Beycord possible in the early days.');
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "botinfo",
  desc: "Information about the bot."
}