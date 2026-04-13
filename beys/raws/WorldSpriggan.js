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
    logger.add(`[${acted.username}] World Spriggan used **World Slash**!`);
    acted.stability -= 3;
}

const WorldSlash = new bcworkshop.Special("World Slash", sreq, suse);

function cbreq(acted, victim, logger){
    return acted.sp >= 4;
}

function cbuse(acted, victim, logger){
    acted.sp -= 4;
    victim.hp -= Math.round(25+(1.1*(acted.lvl-1)));
    victim.stamina -= 2;
}

const CounterBreak = new bcworkshop.Special("Counter Break", cbreq, cbuse);

const WorldSpriggan = new bcworkshop.Beyblade({name: "World Spriggan", type: "Balance", imageLink: "https://cdn.discordapp.com/attachments/999683623248736379/1032078418294095943/IMG_5117.png"})
.addProperty("WSUsed", false)
.attachMode(WorldSpin)
.attachPassive(WorldSpinPassive)
.attachSpecial(WorldSlash)
.attachSpecial(CounterBreak)
.setSDChangable(true);

module.exports = WorldSpriggan;
