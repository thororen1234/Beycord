const bcworkshop = require("bcworkshop");
const { MessageEmbed } = require("discord.js");

function ChainRequirement(acted, victim, logger){// Requirement
    return acted.sp >= 1 && victim.move === "fight";
}

function ChainEffect(acted, victim, logger){// Effect
    acted.sp -= 1
    victim.atk -= (victim.atk/2)
    logger.add(`[${acted.username}] activated **Chain Shoot**!\n [${victim.username}]'s attack reduced by 50%!`)
};

const ChainShoot = new bcworkshop.Passive("Chain Shoot", ChainRequirement, ChainEffect);

const KaiserKerbeus = new bcworkshop.Beyblade({name: "Kaiser Kerbeus", type: "Defense", imageLink: "https://i.imgur.com/9wwTFsS.png"})

.attachPassive(ChainShoot)
.setDefaultSD("Right")
.setSDChangable(false);
module.exports = KaiserKerbeus;