const bcworkshop = require("bcworkshop");

function sareq(acted, victim, logger){
    return acted.sp >= 5;
}

function sause(acted, victim, logger){
    victim.hp - Math.floor(31+((acted.lvl-1)*.7));
    logger.add(`[${acted.username}] used **Fireblast Attack**!`);
    acted.sp -= 5;
}

const FireblastAttack = new bcworkshop.Special("Fireblast Attack", sareq, sause);

function gtreq(acted, victim, logger){
    return victim.hp < (victim.maxhp/100*30) && acted.sp >= 3;
}

function gtuse(acted, victim, logger){
    logger.add(`[${acted.username}] used **Golden Tornado**!`);
    victim.hp = Math.round(victim.hp/100*50);
    acted.sp -= 3;
}

const GoldenTornado = new bcworkshop.Special("Golden Tornado", gtreq, gtuse);

function lbreq(acted, victim, logger){
    return acted.lvl >= 50 && acted.sp >= 3 && !acted.bey.LBUsed;
}

function lbuse(acted, victim, logger){
    logger.add(`[${acted.username}] used **Luck Bringer**!`);
    victim.hp = Math.round(victim.hp/100*50);
    acted.bey.LBUsed = true;
    acted.sp -= 3;
}

const LuckBringer = new bcworkshop.Special("Luck Bringer", lbreq, lbuse);

function nynreq(acted, victim, logger){
    return acted.sp >= 10 && victim.hp < (victim.maxhp/100*20);
}

function nynuse(acted, victim, logger){
    victim.stability = 0.1;
    acted.hp = Math.floor(acted.hp/2);
}

const NewYearNova = new bcworkshop.Special("New Year Nova", nynreq, nynuse);

function nereq(acted, victim, logger){
    return acted.hp < (acted.maxhp/2);
}

function neuse(acted, victim, logger){
    victim.atk = Math.round(victim.atk/100*80);
    acted.sp += 1;
}

const NewEnergy = new bcworkshop.Passive("New Energy", nereq, neuse);

const FireworkPegasus = new bcworkshop.Beyblade({name: "Firework Pegasus", type: "Attack", imageLink: "https://media.discordapp.net/attachments/692234599350140961/809218973392568320/image0.png"})
.attachSpecial(FireblastAttack)
.attachSpecial(GoldenTornado)
.attachSpecial(LuckBringer)
.addProperty("LBUsed", false)
.attachSpecial(NewYearNova)
.attachPassive(NewEnergy);

module.exports = FireworkPegasus;