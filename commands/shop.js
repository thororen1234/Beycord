const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let stats = await db.collection("users").findOne({_id: message.author.id});
  let shopdisplay = new Discord.MessageEmbed()
  .setTitle("**SHOP**")
  .setDescription(`To purchase an item, use the \`${prefix}purchase\` command.`)
  .setColor("7f7fff")
  .addField("**[1]:** Buddy Bey Kit", "Make a Buddy Bey with this awesome kit. | Price: <:valtz:999800344848650410>20000 / <:goldenvaltz:999800462809256046>1")
  .addField("**[2]:** x1.5 EXP Booster 1 Hour", "Boost your EXP earn rate using this booster. | Price: <:valtz:999800344848650410>3999")
  .addField("**[3]:** Toolbox", "Fix a broken Bey using the Toolbox. | Price: <:valtz:999800344848650410>250")
  .addField("**[4]:** Perfect Constructor", "Construct a Perfect Phoenix with a 85% fail rate. | Price: <:valtz:999800344848650410>2000")
  .addField("**[5]:** 3 Premium Tickets Chest", "Gives you 3<:premiumgt:999800780565520505>. | Price: <:goldenvaltz:999800462809256046>1")
  .addField("**[6]:** 10 Premium Tickets Chest", "Gives you 10<:premiumgt:999800780565520505>. | Price: <:goldenvaltz:999800462809256046>3")
  .addField("**[7]:** 35 Premium Tickets Chest", "Gives you 35<:premiumgt:999800780565520505>. | Price: <:goldenvaltz:999800462809256046>10")
  .addField("**[8]:** Void Meat", "Raw meat acquired from the mythical dragon Void, the guardian of \"The Roll\". Can be fed to Void and he will allow you to use \"The Roll\" to roll amazing prizes. | Price: <:valtz:999800344848650410>1000")
  .addField("**[9]:** Gift Box", "Self-explanatory LOL. | Price: <:valtz:999800344848650410>1")
  .addField("**[10]:** Avatar Embryo", "Raise an avatar. | Price: <:valtz:999800344848650410>1999")
  .addField("**[11]:** BeyLauncher LR", "Just your average leftright string launcher. | Price: <:valtz:999800344848650410>1499")
  .setFooter(`Valtz: ${stats.coins} | GV: ${stats.gv}`)
  .setTimestamp();
  
  message.channel.createMessage({embed:shopdisplay});
}

module.exports.help = {
  name: "shop",
  aliases: ["s"]
}