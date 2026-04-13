const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");

function MoonlightClawRequirement(acted, victim, logger){//MlC Requirement
    return acted.sp >= 3;
}

function MoonlightClawEffect(acted, victim, logger){//MlC Effect
  let dmg = Math.floor((40 + .70 * acted.lvl));
  let stb = Math.floor((10 + .18 * acted.lvl));
     victim.hp -= dmg;
     victim.stability -= stb;
     logger.add(`[${acted.username}] Moonlight Dragon used **Moonlight Claw**!\n${dmg} Damage inflicted!\n${stb} Stability damage inflicted!`);
     acted.sp -= 3;
}

const MoonlightClaw = new bcworkshop.Special("Moonlight Claw", MoonlightClawRequirement, MoonlightClawEffect);

function DragonRequirement(acted, victim, logger){//Dragon Requirement
   return acted.sp >= 1 && acted.stamina <= 1 && !acted.bey.Lock;
}

function DragonEffect(acted, victim, logger){//Dragon Effect
  let stm = Math.floor((3 + .6 * acted.lvl));
  acted.stamina += stm;
  acted.bey.Lock = true;
  acted.sp -= 1;
   logger.add(`[${acted.username}] bathes his fur in the moonlight...\n**Moonlight Resonance** active!\n${stm} stamina gained!`);
}

const FullMoonResonance = new bcworkshop.Passive("Full Moon Resonance", DragonRequirement, DragonEffect);

const MoonlightDragon = new bcworkshop.Beyblade({name: "Moonlight Dragon", type: "Balance", imageLink: "https://i.imgur.com/7LGTqWM.png"})

.attachSpecial(MoonlightClaw)
.attachPassive(FullMoonResonance)
.addProperty("Lock", false)
.setDefaultSD("Right")
.setSDChangable(false);
module.exports = MoonlightDragon;