const bcworkshop = require("bcworkshop");
const {MessageEmbed} = require("discord.js");

function GClawReq(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3;
}
function GClaw(acted, victim, logger){
    if (acted.stamina >= Math.round((acted.maxstamina/100)*60)){
        victim.hp -= (60 + 0.2 * acted.lvl);
        victim.stability -= (15 + 0.05 * acted.lvl);
    }else{
        victim.hp -= (70 + 0.2 * acted.lvl);
        victim.stamina -= (1 + 0.01 * acted.lvl);
        acted.stamina += (2 + 0.01 * acted.lvl);
    }
    //What will a special do
logger.add(`[${acted.username}] Geist Fafnir used **Geist Claw**!`);
}
const GeistC = new bcworkshop.Special("Geist Claw", GClawReq, GClaw);

function GCounterReq(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && acted.stability <= Math.round((acted.maxstability/100)*40);
}
function GCounter(acted, victim, logger){
    victim.hp -= (victim.atk + (acted.atk/2));
    acted.stability += (10 + 0.1 * acted.lvl);
    victim.stability -= (5 + 0.05 * acted.lvl);
    //What will a special do
    logger.add(`[${acted.username}] Geist Fafnir used **Geist Counter**!`);
}
const GeistCo = new bcworkshop.Special("Geist Counter", GCounterReq, GCounter);

function GSPinReq(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return acted.stamina <= Math.round((acted.maxstamina/100)*60) && acted.stability >= Math.round((acted.maxstability/100)*30);
}
function GSpin(acted, victim, logger){
    victim.stamina -= (1 + 0.01 * acted.lvl);
    acted.stamina += (2 + 0.01 * acted.lvl);
    victim.atk = Math.round((victim.atk/100)*40);
//What will a passive do
logger.add(`[${acted.username}] Geist Fafnir activated **Geist Spin**!`);
}
const GeistS = new bcworkshop.Passive("Geist Spin", GSPinReq, GSpin, 10);

function ABreakReq(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return victim.move == "Attack" && acted.stamina >= Math.round((acted.maxstamina/100)*40);
}
function ABreak(acted, victim, logger){
    acted.stamina -= (2 - 0.01 * acted.lvl);
    acted.stability -= (10 - 0.05 * acted.lvl);
    victim.hp -= (30 + 0.3 * acted.lvl);
    victim.stability -= (10 + 0.05 * acted.lvl);
//What will a passive do
logger.add(`[${acted.username}] Geist Fafnir activated **Absorb Break**!`);
}
const AbsorbB = new bcworkshop.Passive("Absorb Break", ABreakReq, ABreak, 30);

function PBalanceReq(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return acted.stability <= Math.round((acted.maxstability/100)*70);
}
function PBalance(acted, victim, logger){
    acted.stability += (10 + 0.05 * acted.lvl);
    acted.stamina += (1 + 0.01 * acted.lvl);
//What will a passive do
logger.add(`[${acted.username}] Geist Fafnir activated **Proof Balance**!`);
}
const ProofB = new bcworkshop.Passive("Proof Balance", PBalanceReq, PBalance, 60);


function GBarrageReq(acted, victim, logger){
    return acted.stamina >= Math.round((acted.maxstamina/100)*60);
    //Requirement to activate IF there's a mode change
}
function GBarrage(acted, victim, logger){
    victim.hp -= 0.3;
    acted.stamina -= 0.1;
    victim.stability -= 0.1;
    logger.add(`[${acted.username}] Geist Fafnir is on mode **Geist Barrage**!`);
    //What will mode change do
}
const GeistB = new bcworkshop.Mode("Geist Barrage", GBarrageReq, GBarrage);

function GAbsorbReq(acted, victim, logger){
    return acted.stamina <= Math.round((acted.maxstamina/100)*60);
    //Requirement to activate IF there's a mode change
}
function GAbsorb(acted, victim, logger){
    acted.stamina += 0.2;
    victim.atk -= 0.2;
    logger.add(`[${acted.username}] Geist Fafnir is on mode **Geist Absorb**!`);
    //What will mode change do
}
const GeistA = new bcworkshop.Mode("Geist Absorb", GAbsorbReq, GAbsorb);

const GeistFafnir = new bcworkshop.Beyblade({name:"Geist Fafnir", type: "Stamina", imageLink:"https://i.ibb.co/FW6h8j9/fafnir.png"})

.attachSpecial(GeistC)
.attachSpecial(GeistCo)
.attachPassive(GeistS)
.attachPassive(AbsorbB)
.attachPassive(ProofB)
.attachMode(GeistB)
.attachMode(GeistA)
.setDefaultSD("Left");

module.exports = GeistFafnir;