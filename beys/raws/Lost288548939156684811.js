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
    
    victim.hp = victim.hp - 32;
    let embed = new Discord.MessageEmbed()
    .setColor("#551a8b")
    .setTitle(`[${acted.username}] Lost 288548939156684811 used **Almighty Orb**. 32 damage dealt.`);
    message.channel.send(embed);
  });

const Lost288548939156684811 = new bcworkshop.Beyblade({name: "Lost 288548939156684811", type: "Balance", imageLink: "https://media.discordapp.net/attachments/653723586816638996/661377209180880897/orbeas.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("RIGHT")
.setSDChangable(false);

module.exports = Lost288548939156684811;