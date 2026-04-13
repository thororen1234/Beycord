const bcworkshop = new require("bcworkshop");

const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message){
    let bool;
    if(acted.hp <= (acted.maxhp / 2)) bool = true;
    else bool = false;
    return bool;
  }, function passed(acted, victim, message){
    let ct = acted.bey.type || "Balance";
    let types = ["Attack", "Stamina", "Defense"];
    let random = Math.floor(Math.random() * types.length);
    if(ct === "Balance") acted.bey.type = types[random];
    else acted.bey.type = types[random];
    victim.hp = victim.hp - 32;
    let embed = new Discord.MessageEmbed()
    .setAuthor("Passive Ability")
    .setTitle(`[${acted.username}] Black Spriggan Requiem used **Tip Switch**. The tip of it's driver switched changing it's type to ${acted.bey.type} while also dealing 35 damage.`)
    .setColor("#551a8b");
    message.channel.createMessage({embed: embed});
  }, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger){return acted.sp > 3}, function special(acted, victim, message){
    
    victim.hp = victim.hp - 50;
    let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] Black Spriggan Requiem used **Counter Break**. 50 damage dealt.`)
    .setColor("#551a8b");
    message.channel.createMessage({embed: embed});
  });

const BlackSprigganRequiem = new bcworkshop.Beyblade({name: "Black Spriggan Requiem", type: "Balance", imageLink: "https://cdn.discordapp.com/attachments/490783690323001345/721681887361368064/image-removebg-preview.png"})
.attachPassive(passive)
.attachSpecial(special)
.setDefaultSD("Right")
.setSDChangable(true);

module.exports = BlackSprigganRequiem;