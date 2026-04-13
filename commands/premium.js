const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let premium = await db.collection("users").findOne({_id: message.author.id})
  if(!premium) return message.reply(`you haven't started the game yet. Type \`${prefix}start\` to begin.`);
 
  let user = await db.collection("users").findOne({_id: message.author.id});
  if(args[0] && args[0].toLowerCase() == "get"){
    let gvcost = 5;
    if(user.gv < gvcost) return message.reply("You can't afford Premium! Try again once you have at least **5** Golden Valtz.");
    if(user.gv >= gvcost && !user.premium)
    db.collection("users").updateOne({_id: message.author.id}, {$set: {gv: user.gv - gvcost}});
    db.collection("users").updateOne({_id: message.author.id}, {$set: {premium: true}});
    return message.channel.createMessage(`You bought premium! Thank you for supporting Beycord!`);
  }
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setTitle("Beycord Premium Status")
  .setThumbnail("https://cdn.discordapp.com/attachments/828613764345626654/870862687242977320/844766822770278441.png")
  .setDescription(`**Premium: ${premium.premium}**`)
  .setColor("#FFD700");
  client.createMessage(message.channel.id, {embed:embed});
  
}

module.exports.help = {
  name: "premium",
  aliases: ["premium"],
  desc: "Shows your currencies.",
  usage: "premium - show the amount of gv you have. \npremium get - buy premium."
}