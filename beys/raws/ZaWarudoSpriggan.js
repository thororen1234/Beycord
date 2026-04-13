const bcworkshop = require("bcworkshop");

function wsreq(acted, victim, logger){
    return acted.hp < (acted.maxhp/100*50) && acted.bey.WSUsed == false;
}

function wsuse(acted, victim, logger){
    acted.bey.WSUsed = true;
    acted.bey.type = "Defense";
    acted.bey.WorldSpin.active = true;
    logger.add(`[${acted.username}] **World Spin** activated!`);
}

const WorldSpin = new bcworkshop.Mode("World Spin", wsreq, wsuse);

function wspreq(acted, victim, logger){
    return acted.bey.WorldSpin.active == true;
}

function wspuse(acted, victim, logger){
    victim.atk = Math.round(victim.atk/100*80);
    let a=Math.floor(Math.random() * 5);
    if(a==1)victim.atk=Math.round(victim.atk/100*75);
}

const WorldSpinPassive = new bcworkshop.Passive("World Spin", wspreq, wspuse);

function sreq(acted, victim, logger){
    return acted.sp >= 3;
}

function suse(acted, victim, logger){
    acted.sp -= 3;
    victim.hp -= Math.round(20+(1.1*(acted.lvl-1)));
    logger.add(`[${acted.username}] Za Warudo Spriggan used **World Slash**!`);
    acted.stability -= 3;
}

const WorldSlash = new bcworkshop.Special("World Slash", sreq, suse);

function cbreq(acted, victim, logger){
    return acted.sp >= 4;
}

function cbuse(acted, victim, logger){
    acted.sp -= 4;
    victim.hp -= Math.round(26+(1.1*(acted.lvl-1)));
    victim.stamina -= 2;
}

const CounterBreak = new bcworkshop.Special("Counter Break", cbreq, cbuse);

function tsreq(acted, victim, logger){
    return acted.sp >= 5;
}

function tsuse(acted, victim, logger){
    logger.add("**The World: Time Stop!**");
    acted.bey.ZaWarudo.active = true;
    setTimeout(() => {
        acted.bey.ZaWarudo.active = false;
        logger.add("**Time shall move again.**");
    }, 20000);
}

const TimeStop = new bcworkshop.Special("Time Stop", tsreq, tsuse);

function zwreq(acted, victim, logger){
    return false;
}

function zwuse(acted, victim, logger){
    return true;
    // Think it does nothing? Well NO, it doubles your attack, your spin and your energy charge. How does it work? You don't need to know.
}

const ZaWarudo = new bcworkshop.Mode("Za Warudo", zwreq, zwuse);

const ZaWarudoSpriggan = new bcworkshop.Beyblade({name: "Za Warudo Spriggan", type: "Balance", imageLink: "https://media.discordapp.net/attachments/692234599350140961/825977375069962250/image-removebg-preview.png"})
.addProperty("WSUsed", false)
.attachMode(WorldSpin)
.attachPassive(WorldSpinPassive)
.attachSpecial(WorldSlash)
.attachSpecial(CounterBreak)
.attachSpecial(TimeStop)
.attachMode(ZaWarudo)
.setSDChangable(true);

module.exports = ZaWarudoSpriggan;