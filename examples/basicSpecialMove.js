const bcworkshop = require("../");

function SACheck(acted, victim, message, player){
    return acted.hp < 50 && acted.sp > 3;
}

function SAExecute(acted, victim, message, player){
    victim.hp = 0;
    message.channel.createMessage("YAY!! THE OPPONENT DIED LOL!!!!!")
}

const specialAttack = new bcworkshop.Special("Special Attack", SACheck, SAExecute);

const example = new bcworkshop.Beyblade({
    name: "Dat Bey",
    type: "Attack",
    imageLink: "https://images-ext-2.discordapp.net/external/h4vIrI2eeo1qHDHyRFNharSSj7uFBvRgJt96scMqcOo/https/i.ibb.co/pxVTFw4/Anubis.png?width=100&height=86"
})
.attachSpecial(specialAttack)
.setDefaultSD("Left");


module.exports = example;
