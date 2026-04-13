const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  let startembed = new Discord.MessageEmbed()
  .setTitle('Invite')
  .setDescription('Wanna add Beycord to your server?')
  .setColor("#7f7fff")
  .addFields(
    { name: 'Invite it now!', value: '[Invite to server](https://discord.com/api/oauth2/authorize?client_id=842641944093392908&permissions=8&scope=bot)'}
)
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "invite",
  desc: "Invite the bot to your server."
}