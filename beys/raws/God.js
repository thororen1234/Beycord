const bcworkshop = new require("bcworkshop");


const passive = new bcworkshop.Passive("Passive", function check(acted, victim, message) {
  return false;
}, function passed(acted, victim, message) {
  victim.hp = victim.hp - 28;
  let embed = new Discord.MessageEmbed()
    .setTitle(`Uh oh, [${acted.username}] ${acted.bey.bbname || acted.bey.name} tried to use it's passive ability but it was not set up properly. 28 damage dealt.`)
    .setDescription("Please report this at the support server.")
    .setColor("#551a8b");
  message.channel.createMessage({ embed: embed });
}, 180);

const special = new bcworkshop.Special("Special", function req(acted, victim, logger) { return acted.sp > 0 }, function special(acted, victim, message) {

  victim.hp = victim.hp - { RNG };
  acted.stamina = acted.stamina + 1;
  victim.stamina = victim.stamina - 1;

  let embed = new Discord.MessageEmbed()
    .setTitle(`[${acted.username}] God used **Smite** . ${RNG} damage dealt and 1 stamina absorbed.`)
    .setColor("551a8b");

  message.channel.send(embed);
});

const God = new bcworkshop.Beyblade({ name: "God", type: "Balance", imageLink: "https://cdn.discordapp.com/attachments/1032009191960887388/1032791143412416563/smth.jpg" })
  .attachPassive(passive)
  .attachSpecial(special)
  .setDefaultSD("RIGHT")
  .setSDChangable(false);

module.exports = God;