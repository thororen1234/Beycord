const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");

function SmiteRequirement(acted, victim, logger){//NightmareBoost Requirement
   return acted.sp >= 3;
}

function SmiteEffect(acted, victim, logger){//Smite Effect
   victim.hp -= 999999;
   acted.sp -= 3;
   logger.add(`[${acted.username}] used **Smite**! 999999 damage inflicted!`)
}

const Smite = new bcworkshop.Special("Smite", SmiteRequirement, SmiteEffect);

const ThorsValk = new bcworkshop.Beyblade({name: "Thor's Valk", type: "Attack", imageLink: "https://cdn.discordapp.com/attachments/999683623248736379/1031990905072267347/image0-5_1.png"})
.attachSpecial(Smite)
.setDefaultSD("Right")
.setSDChangable(false);

module.exports = ThorsValk;
