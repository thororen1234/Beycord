const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let gv = await db.collection("users").findOne({_id: message.author.id}, {_id: 0, gv: 0})
  if(!gv) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
  if(gv.gv == undefined || gv.gv == null || typeof gv.gv !== "number" || typeof gv.gv == "string"){
    db.collection("users").updateOne({_id: message.author.id}, {$set: {gv: 0}});
  }
  
  let embed = new Discord.MessageEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setTitle("Your Golden Valtz")
  .setThumbnail("https://cdn.discordapp.com/attachments/828613764345626654/846292826341769266/844765580748914728.png")
  .setDescription(`<:goldenvaltz:844765580748914728> ${gv.gv}`)
  .setColor("#FFD700");
  client.createMessage(message.channel.id, {embed:embed});
  }

module.exports.help = {
  name: "goldenvaltz",
  aliases: ["gv"],
  desc: "Shows your currencies.",
  usage: "goldenvaltz - show the amount of gv you have."
}