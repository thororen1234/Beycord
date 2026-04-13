const bcworkshop = require("bcworkshop");

function sareq(acted, victim, logger){
    return acted.sp >= 5;
}

function sause(acted, victim, logger){
    victim.hp - Math.floor(29+((acted.lvl-1)*.7));
    logger.add(`[${acted.username}] used **Stardust Attack**!`);
    acted.sp -= 5;
}

const StardustAttack = new bcworkshop.Special("Stardust Attack", sareq, sause);

function dreq(acted, victim, logger){
    return acted.hp<(acted.maxhp/100*30) && acted.sp >= 3;
}

function duse(acted, victim, logger){
    acted.sp -= 3;
    logger.add(`[${acted.username}] used **Defender**!`);
    victim.atk = Math.round(victim.atk/100*5);
}

const Defender = new bcworkshop.Special("Defender", dreq, duse);

function ereq(acted, victim, logger){
    return acted.hp < (acted.maxhp/2);
}

function euse(acted, victim, logger){
    acted.stamina += 3;
}

const Excuse = new bcworkshop.Mode("Excuse", ereq, euse);

function nereq(acted, victim, logger){
    return !!acted.bey.Excuse.active;
}

function neuse(acted, victim, logger){
    victim.atk = Math.round(victim.atk/100*80);
}

const ExcuseMe = new bcworkshop.Passive("Excuse Me", nereq, neuse, 1);

const ExcusePegasus = new bcworkshop.Beyblade({name: "Excuse Pegasus", type: "Defense", imageLink: "https://media.discordapp.net/attachments/666804470256238640/817613319400849428/imgonline-com-ua-ReplaceColor-c7OzbWALaW4xrs0F-removebg-preview.png"})
.attachMode(Excuse)
.attachPassive(ExcuseMe)
.attachSpecial(Defender)
.attachSpecial(StardustAttack);

module.exports = ExcusePegasus;