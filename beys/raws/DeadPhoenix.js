const bcworkshop = require("bcworkshop");
const {MessageEmbed} = require("discord.js");

function DBreakReq(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && !!acted.bey.AOn.active;
}
function DBreak(acted, victim, logger){
    victim.hp -= (40 + 0.3 * acted.lvl);
    acted.stamina -= (2 - 0.1 * acted.lvl);
    let chance = Math.floor(Math.random()*10);
    if (chance == 0){
        acted.mode.AOn = false
        acted.mode.AFoo = true
    }
    //What will a special do
logger.add(`[${acted.username}] Dead Phoenix used **Dead Break**!`);
}
const DeadB = new bcworkshop.Special("Dead Break", DBreakReq, DBreak);

function DFortressReq(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 3 && !!acted.bey.AOn.active;
}
function DFortress(acted, victim, logger){
    victim.hp -= (acted.atk + (victim.atk/2));
    victim.stability -= (20 + 0.05 * acted.lvl);
    victim.atk = Math.round((victim.atk/100)*20);
    //What will a special do
logger.add(`[${acted.username}] Dead Phoenix used **Dead Fortress**!`);
}
const DeadF = new bcworkshop.Special("Dead Fortress", DFortressReq, DFortress);

function DStingerReq(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 4 && !!acted.bey.AFoo.active;
}
function DStinger(acted, victim, logger){
    victim.hp -= (50 + 0.4 * acted.lvl);
    acted.stamina -= (2.5 - 0.1 * acted.lvl);
    victim.stability -= (20 + 0.1 * acted.lvl);
    //What will a special do
    logger.add(`[${acted.username}] Dead Phoenix used **Dead Stinger**!`);
}
const DeadS = new bcworkshop.Special("Dead Stinger", DStingerReq, DStinger);

function FDImpactReq(acted, victim, logger){
    //Requirements to use special, can 
    return acted.sp >= 4 && !!acted.bey.AFoo.active && !!acted.bey.PerishD.active;
}
function FDImpact(acted, victim, logger){
    victim.hp -= (50 + 0.5 * acted.lvl);
    victim.stability -= (30 + 0.2 * acted.lvl);
    //What will a special do
    logger.add(`[${acted.username}] Dead Phoenix used **Final Dead Impact**!`);
}
const FDeadI = new bcworkshop.Special("Final Dead Impact", FDImpactReq, FDImpact);

function DeadStReq(acted, victim, logger){
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return !!acted.bey.AFoo.active;
}
function DeadSt(acted, victim, logger){
    victim.stamina -= (1 + 0.2 * acted.lvl);
    victim.hp -= (10 + 0.1 * acted.lvl);
//What will a passive do
logger.add(`[${acted.username}] Dead Phoenix activated **Dead Sabotage**!`);
}
const DSabotage = new bcworkshop.Passive("Dead Sabotage", DeadStReq, DeadSt, 20);

function DoubleDSReq(acted, victim, logger){
    let chance = Math.floor(Math.random()*10);
    //requirement of any passive, can be changed into anything, stam, hp, ect.
    return chance == 0 && !!acted.bey.DeadS.active;
}
function DoubleDS(acted, victim, logger){
    victim.hp -= (50 + 0.5 * acted.lvl);
    victim.stability -= (20 + 0.1 * acted.lvl);
//What will a passive do
logger.add(`[${acted.username}] Dead Phoenix activated **Double Dead Stinger**!`);
}
const DDeadS = new bcworkshop.Passive("Double Dead Stinger", DoubleDSReq, DoubleDS, 120);

function ArmorOReq(acted, victim, logger){
    return acted.hp >= Math.round((acted.maxhp/100)*75);
    //Requirement to activate IF there's a mode change
}
function ArmorO(acted, victim, logger){
    victim.atk -= (0.5 + 0.05 * acted.lvl);
    acted.stability += 0.3;
    logger.add(`[${acted.username}] Dead Phoenix is on mode **Armor on**!`);
    //What will mode change do
}
const AOn = new bcworkshop.Mode("Armor on", ArmorOReq, ArmorO);

function ArmorFReq(acted, victim, logger){
    let chance = Math.floor(Math.random()*4);
    return acted.hp <= Math.round((acted.maxhp/100)*75) && chance == 0;;
    //Requirement to activate IF there's a mode change
}
function ArmorF(acted, victim, logger){
    acted.stamina += 0.1;
    acted.atk = Math.round((acted.atk/100)*70);
    logger.add(`[${acted.username}] Dead Phoenix is on mode **Armor off**!`);
    //What will mode change do
}
const AFoo = new bcworkshop.Mode("Armor off", ArmorFReq, ArmorF);

function PDeadReq(acted, victim, logger){
    return acted.hp <= Math.round((acted.maxhp/100)*20);
    //Requirement to activate IF there's a mode change
}
function PDead(acted, victim, logger){
    if (victim.bey.name === "Cho-Z Achilles"){
        acted.atk += (acted.atk+(acted.atk/2));
        victim.atk = Math.round((victim.atk/100)*20);
        logger.add(`[${acted.username}] Dead Phoenix is on mode **Perish for the Dead EX**!`);
    }
    else{
        acted.atk += (acted.atk+2);
        victim.atk = Math.round((victim.atk/100)*50);
        logger.add(`[${acted.username}] Dead Phoenix is on mode **Perish for the Dead**!`);
    }
    //What will mode change do
}
const PerishD = new bcworkshop.Mode("Perish for the Dead", PDeadReq, PDead);

const DeadPhoenix = new bcworkshop.Beyblade({name:"Dead Phoenix", type: "Defense", imageLink:"https://i.ibb.co/BwLzx6M/dead.png"})

.attachSpecial(DeadB)
.attachSpecial(DeadF)
.attachSpecial(DeadS)
.attachSpecial(FDeadI)
.attachPassive(DSabotage)
.attachPassive(DDeadS)
.attachMode(AOn)
.attachMode(AFoo)
.attachMode(PerishD)
.setDefaultSD("Right");

module.exports = DeadPhoenix;