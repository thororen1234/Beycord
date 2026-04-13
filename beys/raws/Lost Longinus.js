const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");

function DeathSpiralRequirement(acted, victim, logger){//DeathSpiral Requirement
    return acted.sp >= 3;
}

function DeathSpiralEffect(acted, victim, logger){//DeathSpiral Effect
   let dmg = Math.floor((35 + .9 * acted.lvl));
   let stb = Math.floor((10 + .12 * acted.lvl));
     victim.hp -= dmg;
     victim.stability -= stb;
     acted.sp -= 3;
     logger.add(`[${acted.username}] Lost Longinus used **Death Spiral**!\n${dmg} damage inflicted! ${stb} stability damage inflicted!`);
}

const DeathSpiral = new bcworkshop.Special("Death Spiral", DeathSpiralRequirement, DeathSpiralEffect);

function NightmareBoostRequirement(acted, victim, logger){//NightmareBoost Requirement
   return !acted.bey.Lock;
}

function NightmareBoostEffect(acted, victim, logger){//NightmareBoost Effect
   acted.bey.Lock = true;
   let stm = Math.floor((acted.stamina * .3));
   acted.stamina += stm;
   acted.sp = 1;
   logger.add(`[${acted.username}] launched with **Nightmare Boost**!\nStamina increased by 30% of max!\n1 Energy gained!`)
}

const NightmareBoost = new bcworkshop.Passive("Nightmare Boost", NightmareBoostRequirement, NightmareBoostEffect);

const LostLonginus = new bcworkshop.Beyblade({name: "Lost Longinus", type: "Attack", imageLink: "https://media.discordapp.net/attachments/736042245442109441/826656822001664070/image0.png?width=644&height=548"})
.attachSpecial(DeathSpiral)
.attachPassive(NightmareBoost)
.addProperty("Lock", false)
.setDefaultSD("Left")
.setSDChangable(false);
module.exports = LostLonginus;