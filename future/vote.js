const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
    let votes = await db.collections("users").findOne({_id: message.author.id})
    if(!votes) return message.reply(`you haven't started the game yet. Type \`${prefix}start\` to begin.`);

    let user = await db.collection("users").findOne({_id: message.author.id});
  if(args[0] && args[0].toLowerCase() == "claim"){
    let gvcost = 5;
    if(user.gv < gvcost) return message.reply("You can't afford Premium! Try again once you have at least **5** Golden Valtz.");
    if(user.gv >= gvcost && !user.premium)
    db.collection("users").updateOne({_id: message.author.id}, {$set: {gv: user.gv - gvcost}});
    db.collection("users").updateOne({_id: message.author.id}, {$set: {premium: true}});
    return message.channel.createMessage(`You bought premium! Thank you for supporting Beycord!`);
  }
}