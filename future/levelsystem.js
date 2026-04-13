const Discord = require("discord.js");

module.exports.run = async (client, message, args, prefix, player, db) =>{
let level = await db.collection("users").findOne({_id: message.author.id});
if (level.xp >= 300 && level.level === 1){
    db.collection("users").UpdateOne({_id: message.author.id}, {$set: {level: 2}})
}
if (level.xp >= 600 && level.level === 2){
    db.collection("users").UpdateOne({_id: message.author.id}, {$set: {level: 3}})
}
if (level.xp >= 900 && level.level === 3){
    db.collection("users").UpdateOne({_id: message.author.id}, {$set: {level: 4}})
}
if (level.xp >= 1200 && level.level == 4){
    db.collection("users").UpdateOne({_id: message.author.id}, {$set: {level: 5}});
}    


new Discord.MessageEmbed()
    .setTitle("Congratulation! You leveled up!")
    .setDescription(`You leveled up to ${level.level}`)
}