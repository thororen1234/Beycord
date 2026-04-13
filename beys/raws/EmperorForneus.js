const bcworkshop = require("bcworkshop");
const {MessageEmbed} = require("discord.js");

function ReqEGuard(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && acted.stamina >= Math.round((acted.maxstamina/100)*60);
}
function EGuard(acted, victim, logger){
    victim.stability -= (10 + 0.05 * victim.lvl);
    victim.atk = Math.round((victim.atk/100)*20);
    acted.stamina -= (2 - 0.01 * acted.lvl);
    //What will a special do
logger.add(`[${acted.username}] Emperor Forneus used **Emperor Guard**!`);
}
const EmperorG = new bcworkshop.Special("Emperor Guard", ReqEGuard, EGuard);

function ReqECRash(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && acted.stamina >= Math.round((acted.maxstamina/100)*60);
}
function ECrash(acted, victim, logger){
    victim.stability -= (10 + 0.1 * victim.lvl);
    victim.hp -= (60 + 0.2 * victim.lvl);
    acted.stamina -= (3 - 0.01 * acted.lvl);
    //What will a special do
    logger.add(`[${acted.username}] Emperor Forneus used **Emperor Crash**!`);
}
const EmperorC = new bcworkshop.Special("Emperor Crash", ReqECRash, ECrash);

function ReqEmperorD(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    let chance = Math.floor(Math.random()*4);
    return !!acted.bey.EmperorG.active && chance == 0;
}
function EmperorD(acted, victim, logger){
    victim.stability -= (5 + 0.05 * victim.lvl);
    victim.hp -= (20 + 0.2 * victim.lvl);
//What will a passive do
logger.add(`[${acted.username}] Emperor Forneus activated **Emperor Drift**!`);
}
const EDrift = new bcworkshop.Passive("Emperor Drift", ReqEmperorD, EmperorD, 20);

function ReqUEmperorD(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    let chance = Math.floor(Math.random()*10);
    return !!acted.bey.EmperorG.active && chance == 0 && acted.sp >= 3 && acted.lvl >= 50;
}
function UEmperorD(acted, victim, logger){
    victim.stability -= (10 + 0.05 * victim.lvl);
    victim.hp -= (20 + 0.4 * victim.lvl);
//What will a passive do
logger.add(`[${acted.username}] Emperor Forneus activated **Ultra Emperor Drift**!`);
}
const UEDrift = new bcworkshop.Passive("Ultra Emperor Drift", ReqUEmperorD, UEmperorD, 60);

function ReqYTackle(acted, victim, logger){
    let chance = Math.floor(Math.random()*10);
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return acted.move == "Defend" && chance == 0 && acted.sp >= 3 && acted.stability <= Math.round((acted.maxstamina/100)*30);
}
function YTackle(acted, victim, logger){
    acted.sp -= 3;
    victim.atk = Math.round((victim.atk/100)*20);
    let AS = acted.stability;
    let BS = victim.stability;
    acted.stability = BS;
    victim.stability = AS;
//What will a passive do
logger.add(`[${acted.username}] Emperor Forneus activated **Yard Tackle**!`);
}
const YardT = new bcworkshop.Passive("Yard Tackle", ReqYTackle, YTackle, 120);

function ReqYardS(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return acted.stability <= (20 + 0.1 * acted.lvl) && acted.stamina >= Math.round((acted.maxstamina/100)*70);
}
function YardS(acted, victim, logger){
    acted.stability += Math.round((acted.maxstability/100)*20);
    acted.stamina -= (2 + 0.1 * victim.lvl);
//What will a passive do
logger.add(`[${acted.username}] Emperor Forneus activated **Yard Save**!`);
}
const YSave = new bcworkshop.Passive("Yard Save", ReqYardS, YardS, 120);

function ReqMWave(acted, victim, logger){
    return acted.stamina >= Math.round((acted.maxstamina/100)*80) && acted.move == "Defend";
    //Requirement to activate IF there's a mode change
}
function MWave(acted, victim, logger){
    setTimeout(() => {acted.bey.MetalW.active = false}, 5000);
    victim.stability -= 0.3;
    acted.stability -= 0.1;
    acted.stamina -= 0.1;
    victim.hp -= 0.5;
    logger.add(`[${acted.username}] Emperor Forneus is on mode **Metal Wave**!`);
    //What will mode change do
}
const MetalW = new bcworkshop.Mode("Metal Wave", ReqMWave, MWave);

const EmperorForneus = new bcworkshop.Beyblade({name:"Emperor Forneus", type: "Defense", imageLink:"https://static.wikia.nocookie.net/beyblade/images/7/76/BeybladeForneusAnime.png/revision/latest/scale-to-width-down/315?cb=20190918210051"})

.attachSpecial(EmperorG)
.attachSpecial(EmperorC)
.attachPassive(EDrift)
.attachPassive(UEDrift)
.attachPassive(YardT)
.attachPassive(YSave)
.attachMode(MetalW)
.setDefaultSD("Right");

module.exports = EmperorForneus;