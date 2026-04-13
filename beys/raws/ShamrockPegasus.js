const bcworkshop = require("bcworkshop");

function sareq(acted, victim, logger){
    return acted.sp >= 5;
}

function sause(acted, victim, logger){
    acted.sp -= 5;
    victim.hp - Math.floor(29+((acted.lvl-1)*.7));
    logger.add(`[${acted.username}] used **Shamrock Attack**!`);
}

const ShamrockAttack = new bcworkshop.Special("Shamrock Attack", sareq, sause);

function lareq(acted, victim, logger){
    return acted.hp <= (acted.maxhp/100*80) && acted.sp >= 1;
}

function lause(acted, victim, logger){
    acted.sp -= 1;
    let amt;
    switch(true){
        case (acted.lvl > 35):
            amt = 2;
        break;
        case (acted.lvl > 70):
            amt = 3;
        break;
        default:
            amt = 1;
    }
    acted.stamina += amt;
    victim.stamina -= amt;
}

const LuckAbsorb = new bcworkshop.Passive("Luck Absorb", lareq, lause, 8);

function gcreq(acted, victim, logger){
    return acted.sp >= 3;
}

function gcuse(acted, victim, logger){
    acted.sp -= 3;
    victim.hp -= Math.round(24+(acted.lvl*1.15));
    acted.hp = acted.hp/100*95;
}

const GreenClover = new bcworkshop.Special("Green Clover", gcreq, gcuse);

function lgreq(acted, victim, logger){
    return acted.hp <= (acted.maxhp/100*50) && !acted.bey.LuckGenerator.active && !acted.bey.LGActivated;
}

function lguse(acted, victim, logger){
    acted.bey.LGActivated = true;
    acted.bey.LuckGenerator.active = true;
    acted.stability += 20;
    if(acted.stability > 100) acted.stability = 100;
    setTimeout(() => {
        acted.bey.LuckGenerator.active = false;
    }, 10000);
}

const LuckGenerator = new bcworkshop.Mode("Luck Generator", lgreq, lguse);

function lmreq(acted, victim, logger){
    return !!acted.bey.LuckGenerator.active;
}

function lmuse(acted, victim, logger){
    acted.atk = (acted.atk/100*110);
}

const LuckManifestation = new bcworkshop.Passive("Luck Manifestation", lmreq, lmuse);

const ShamrockPegasus = new bcworkshop.Beyblade({name: "Shamrock Pegasus", type: "Attack", imageLink: "https://cdn.discordapp.com/attachments/736042245442109441/817217146328580096/image0.png"})
.attachSpecial(ShamrockAttack)
.attachPassive(LuckAbsorb)
.attachSpecial(GreenClover)
.attachMode(LuckGenerator)
.addProperty("LGActivated", false)
.attachPassive(LuckManifestation);

module.exports = ShamrockPegasus;