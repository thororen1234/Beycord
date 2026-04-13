const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) => {
  let profile = await db.collection("users").findOne({_id: message.author.id}, {_id: 0, coins: 1, xp: 1, level: 1,faction: 1,premium: 1, launcher: 1, wins: 1, streak: 1})
  if(!profile) return message.reply(`you haven't started the game yet. Type \`\`${prefix}start\`\` to begin.`);
  let embed = new Discord.MessageEmbed()
  .setTitle(message.author.tag + "'s Profile")
  .setThumbnail(message.author.avatarURL)
  .addFields(
    { name: 'Blader Level:', value: `${profile.level}`},
    { name: 'EXPs', value: `${profile.xp}`},
    { name: 'Balance', value: `<:valtz:844765554237243403>${profile.coins}`},
    { name: 'Victories', value: `${profile.wins}`},
    { name: 'Faction', value: `${profile.faction}`}
  )
    .setColor("#2B60DE");
  client.createMessage(message.channel.id, {embed:embed});
  }

module.exports.help = {
  name: "profile",
  aliases: ["pf"],
  desc: "Shows your profile.",
  usage: "profile - show your profile."
}