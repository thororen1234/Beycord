const bcworkshop = require("bcworkshop");
const {MessageEmbed} = require("discord.js");

function HellDReq(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && acted.stamina >= Math.round((acted.maxstamina/100)*70);
}
function HellD(acted, victim, logger){
    acted.stamina += (2 + 0.2 * acted.lvl);
    victim.hp -= (30 + 0.3 * acted.lvl);
    //What will a special do
logger.add(`[${acted.username}] Hell Kerbecs used **Hell Drive**!`);
}
const HDrive = new bcworkshop.Special("Hell Drive", HellDReq, HellD);

function HellGReq(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && acted.stamina <= Math.round((acted.maxstamina/100)*70);
}
function HellG(acted, victim, logger){
    victim.hp -= (20 + 0.3 * acted.lvl);
    victim.stability -= (10 + 0.1 * acted.lvl);
    acted.sp += (1 + 0.01 * acted.lvl);
    //What will a special do
    logger.add(`[${acted.username}] Hell Kerbecs used **Hell's Gate**!`);
}
const HGate = new bcworkshop.Special("Hell's Gate", HellGReq, HellG);

function LiftFUReq(acted, victim, logger){
    //Requirements to use special, can 
    return !acted.bey.LUpper.active && !acted.bey.LLower.active;
}
function LiftFU(acted, victim, logger){
    //What will a special do
    logger.add(`[${acted.username}] Hell Kerbecs used **Lift Flip Up**!`);
}
const LFlipUp = new bcworkshop.Special("Lift Flip Up", LiftFUReq, LiftFU);

function LiftFDReq(acted, victim, logger){
    //Requirements to use special, can 
    return !acted.bey.LUpper.active && !acted.bey.LLower.active;
}
function LiftFD(acted, victim, logger){
    //What will a special do
    logger.add(`[${acted.username}] Hell Kerbecs used **Lift Flip Down**!`);
}
const LFlipDown = new bcworkshop.Special("Lift Flip Down", LiftFDReq, LiftFD);

function HellPReq(acted, victim, logger){
    let chance = Math.floor(Math.random()*4);
    return !!acted.bey.HGate.active && chance == 0;
}
function HellP(acted, victim, logger){
    setTimeout(() => {acted.bey.HPenance.active = false}, 4000);
    victim.atk = 0;
    victim.stamina -= 0.3;
    acted.hp += 0.2;
logger.add(`[${acted.username}] Hell Kerbecs activated **Hell Penance**!`);
}
const HPenance = new bcworkshop.Mode("Hell Penance", HellPReq, HellP);

function HellFReq(acted, victim, logger){
    return !!acted.bey.HDrive.active;
    //Requirement to activate IF there's a mode change
}
function HellF(acted, victim, logger){
    setTimeout(() => {acted.bey.HFlame.active = false}, 5000);
    acted.atk += (0.3 + 0.02 * acted.lvl);
    victim.atk -= (0.2 + 0.02 * acted.lvl);
    victim.stamina -= (0.1 + 0.01 * acted.lvl);
    logger.add(`[${acted.username}] Hell Kerbecs is on mode **Hell Flame**!`);
    //What will mode change do
}
const HFlame = new bcworkshop.Mode("Hell Flame", HellFReq, HellF);

function LiftUReq(acted, victim, logger){
    return !!acted.bey.LFlipUp.active;
    //Requirement to activate IF there's a mode change
}
function LiftU(acted, victim, logger){
    victim.atk -= (0.5 + 0.03 * acted.lvl);
    acted.stability += (0.2 + 0.03 * acted.lvl);
    acted.stamina -= (0.3 - 0.02 * acted.lvl);
    logger.add(`[${acted.username}] Hell Kerbecs is on mode **Lift Upper**!`);
    //What will mode change do
}
const LUpper = new bcworkshop.Mode("Lift Upper", LiftUReq, LiftU);

function LiftLReq(acted, victim, logger){
    return !!acted.bey.LFlipDown.active;
    //Requirement to activate IF there's a mode change
}
function LiftL(acted, victim, logger){
    acted.atk += (0.5 + 0.03 * acted.lvl);
    acted.stamina -= (0.3 - 0.02 * acted.lvl);
    victim.stamina -= (0.1 + 0.02 * acted.lvl);
    logger.add(`[${acted.username}] Hell Kerbecs is on mode **Lift Lower**!`);
    //What will mode change do
}
const LLower = new bcworkshop.Mode("Lift Lower", LiftLReq, LiftL);

const HellKerbecs = new bcworkshop.Beyblade({name:"Hell Kerbecs", type: "Defense", imageLink:"https://i.ibb.co/s5xFJ8z/HK.png"})

.attachSpecial(HDrive)
.attachSpecial(HGate)
.attachSpecial(LFlipUp)
.attachSpecial(LFlipDown)
.attachMode(HPenance)
.attachMode(HFlame)
.attachMode(LUpper)
.attachMode(LLower)
.setDefaultSD("Right");

module.exports = HellKerbecs;