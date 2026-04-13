const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
    return false;
  }, function passed(acted, victim, message){
    victim.hp = victim.hp - 28;
    let embed = new Discord.MessageEmbed()
    .setTitle(`Uh oh, [${acted.username}] ${acted.bey.bbname || acted.bey.name} tried to use it's passive ability but it was not set up properly. 28 damage dealt.`)
    .setDescription("Please report this at the support server.")
    .setColor("#551a8b");
    message.channel.createMessage({embed: embed});
  }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){

    victim.hp = victim.hp - 50;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] thororen used **Ban Hammer**. 50 damage dealt.`)
    .setColor("#551a8b");
    message.channel.send(embed);
  });

const Thororen = new bcworkshop.Beyblade({name: "thororen", type: "Attack", imageLink: "https://cdn.discordapp.com/attachments/999683623248736379/1031988350564966461/circle-cropped_2.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = Thororen;
