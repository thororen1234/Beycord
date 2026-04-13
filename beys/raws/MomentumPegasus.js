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

function mtreq(acted, victim, logger){
    return victim.hp < (victim.maxhp/100*30) && acted.sp >= 3;
}

function mtuse(acted, victim, logger){
    logger.add(`[${acted.username}] used **Mist Tornado**!`);
    victim.hp = Math.round(victim.hp/100*60);
    acted.sp -= 3;
}

const MistTornado = new bcworkshop.Special("Mist Tornado", mtreq, mtuse);

function lbreq(acted, victim, logger){
    return acted.lvl >= 50 && acted.sp >= 3 && !acted.bey.LBUsed;
}

function lbuse(acted, victim, logger){
    logger.add(`[${acted.username}] used **Mass Bringer**!`);
    victim.hp = Math.round(victim.hp/100*55);
    victim.stamina -= 0.5;
    acted.bey.LBUsed = true;
    acted.sp -= 3;
}

const MassBringer = new bcworkshop.Special("Mass Bringer", lbreq, lbuse);

function mreq(acted, victim, logger){
    return acted.hp < (acted.maxhp/2);
}

function muse(acted, victim, logger){
    acted.sp += 3;
}

const Momentum = new bcworkshop.Mode("Momentum", mreq, muse);

function nereq(acted, victim, logger){
    return !!acted.bey.Momentum.active;
}

function neuse(acted, victim, logger){
    victim.stamina -= .3;
    acted.stamina += .3;
    acted.hp += 10;
}

const MomentumCalculation = new bcworkshop.Passive("Momentum Calculation", nereq, neuse, 1);

const MomentumPegasus = new bcworkshop.Beyblade({name: "Momentum Pegasus", type: "Stamina", imageLink: "https://media.discordapp.net/attachments/756736605380935681/817603103179931668/7f7cfead-eec3-467c-866a-948e538f87c9_bcb7d440-7874-4610-92da-cff72677d517.imagssse.png?width=615&height=587"})
.setDefaultSD("LEFT")
.attachMode(Momentum)
.attachPassive(MomentumCalculation)
.attachSpecial(MassBringer)
.attachSpecial(MistTornado)
.attachSpecial(StardustAttack);

module.exports = MomentumPegasus;
