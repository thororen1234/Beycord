//Required
const Discord = require('discord.js');
const Eris = require("eris-additions")(require("eris"));
const fs = require('fs');
const prefix = ";";
require('dotenv').config();

//Eris CLient
const client = new Eris(process.env.TOKEN, { restMode: true });
client.commands = new (Discord.Collection || Map)();
client.beys = new (Discord.Collection || Map)();
client.parts = new (Discord.Collection || Map)();
client.items = new (Discord.Collection || Map)();
client.spawns = new (Discord.Collection || Map)();
client.blackbeys = new (Discord.Collection || Map)();
client.commonbeys = new (Discord.Collection || Map)();
client.rarebeys = new (Discord.Collection || Map)();
client.legendarybeys = new (Discord.Collection || Map)();
client.availablebeys = new (Discord.Collection || Map)();
client.bosses = new (Discord.Collection || Map)();
client.boss = new (Discord.Collection || Map)();

export function executeFromURL(client, webhookURL, options) {
    const { pathname } = new URL(webhookURL);
    const parts = pathname.split("/");

    const webhookID = parts[parts.length - 2];
    const token = parts[parts.length - 1];

    return client.executeWebhook(webhookID, token, options);
}

//MongoDB Variable
const { MongoClient } = require("mongodb");
const mongo = new MongoClient(process.env.MONGOURL, { useUnifiedTopology: true })
mongo.connect((err) => {
    if (err) throw err;
    console.log("Connection to MongoDB database established successfully!");
});

//Commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name || command.help.name, command);
}

//Spawns
const spawnFiles = fs.readdirSync(`./systems`).filter(file => file.endsWith("js") && file !== "bosssystem.js");
for (const file of spawnFiles) {
    const spawn = require(`./systems/${file}`)
    client.spawns.set(spawn.name || spawn.help.name, spawn)
}


//Boss System
const bossFiles = fs.readdirSync(`./systems`).filter(file => file.endsWith("js") && file !== "spawnsystem.js");
for (const file of bossFiles) {
    const bosssystem = require(`./systems/${file}`)
    client.boss.set(bosssystem.name || bosssystem.help.name, bosssystem)
}


//Bosses
const bosstypeFiles = fs.readdirSync(`./bosses`).filter(file => file.endsWith("js"));
for (const file of bosstypeFiles) {
    const bosses = require(`./bosses/${file}`)
    client.bosses.set(bosses.name || bosses.help.name, bosses)
}


//Beys
const beyFiles = fs.readdirSync('./beys').filter(file => file.endsWith(".js") && file !== ".gitignore" && file !== "Beyblade.js");
for (const file of beyFiles) {
    const bey = require(`./beys/${file}`);
    const beyc = new bey("1", "1");
    client.beys.set(beyc.name, bey);
}


//Common Beys
const commonbeyFiles = fs.readdirSync('c:/beycordplus/commonbeys').filter(file => file.endsWith(".js") && file !== "Beyblade.js");
for (const file of commonbeyFiles) {
    const commonbey = require(`c:/beycordplus/commonbeys/${file}`);
    const commonbeyc = new commonbey("1", "1");
    client.commonbeys.set(commonbeyc.name, commonbey);
}


//Rare Beys
const rarebeyFiles = fs.readdirSync('c:/beycordplus/rarebeys').filter(file => file.endsWith(".js") && file !== "Beyblade.js");
for (const file of rarebeyFiles) {
    const rarebey = require(`c:/beycordplus/rarebeys/${file}`);
    const rarebeyc = new rarebey("1", "1");
    client.rarebeys.set(rarebeyc.name, rarebey);
}


//Legendary Beys
const legendarybeyFiles = fs.readdirSync('c:/beycordplus/beys').filter(file => file.endsWith(".js") && file !== "Beyblade.js" && file !== "Ace Dragon" && file !== "Acid Anubis" && file !== "Alter Chronos" && file !== "Arc Bahamut" && file !== "Archer Hercules" && file !== "Beast Behemoth" && file !== "Beat Kukulkan" && file !== "Blast Jinnius" && file !== "Blaze Ragnarok" && file !== "Bloody Longinus" && file !== "Bushin Ashura" && file !== "Buster Xcalibur" && file !== "Chaos" && file !== "Cho-Z Valkyrie" && file !== "Crash Ragnaruk" && file !== "Dark Deathscyther" && file !== "Dark Perfect Phoenix" && file !== "Dead Hades" && file !== "Deathscyther" && file !== "Diomedes D2" && file !== "Driger Slash" && file !== "Earth Aquila" && file !== "Erase Diabolos" && file !== "Evil-eye" && file !== "Exceed Evil-eye" && file !== "Fang Fenrir" && file !== "Flame Sagittario" && file !== "Gaia Dragoon" && file !== "Galaxy Zeus" && file !== "Gigant Gaia" && file !== "God Valkyrie" && file !== "Guardian Kerbeys" && file !== "Holy Horusood" && file !== "Horusood" && file !== "Hyrus H2" && file !== "Inferno Ifrit" && file !== "Istros I2" && file !== "Jail Jormungand" && file !== "Kaiser Kerbeus" && file !== "Kerbeus" && file !== "Killer Deathscyther" && file !== "King Kerbeus" && file !== "Kreis Satan" && file !== "Legend Spriggan" && file !== "Lightning L-Drago" && file !== "Lost Longinus" && file !== "Mad Minoboros" && file !== "Maximum Garuda" && file !== "Minoboros" && file !== "Neptune" && file !== "Nightmare Longinus" && file !== "Nova Neptune" && file !== "Obelisk Odin" && file !== "Odin" && file !== "Orpheus O2" && file !== "Psychic Phantom" && file !== "Quad Quetzalcoatl" && file !== "Ragnaruk" && file !== "Revive Phoenix" && file !== "Rising Ragnaruk" && file !== "Rock Leone" && file !== "Screw Trident" && file !== "Shelter Regulus" && file !== "Sieg Xcalibur" && file !== "Slash Valkyrie" && file !== "Spriggan" && file !== "Storm Pegasus" && file !== "Spryzen Requiem" && file !== "Surtr S2" && file !== "Tornado Wyvern" && file !== "Trident" && file !== "Twin Nemesis" && file !== "Tyros T2" && file !== "Unicorn" && file !== "Unlock Unicorn" && file !== "Valkyrie" && file !== "Venom Diabolos" && file !== "Victory Valkyrie" && file !== "Wild Wyvern" && file !== "Winning Valkyrie" && file !== "Wizard Fafnir" && file !== "Wyvern" && file !== "Xcalibur" && file !== "Xeno Xcalibur" && file !== "Yaegar Yggdrasil" && file !== "Yggdrasil" && file !== "Z Achilles" && file !== "Zillion Zeus" && file !== "Lost 288548939156684811" && file !== "Cho-Z Achilles" && file !== "Shamrock Pegasus" && file !== "Stardust Pegasus" && file !== "Momentum Pegasus" && file !== "Excuse Pegasus" && file !== "Za Warudo Spriggan" && file !== "Flaming Hot Cheeto" && file !== "Breezing Cool Cheeto" && file !== "Lunar Minoboros" && file !== "Hallow Xcalibur" && file !== "Perfect Phoenix" && file !== "Black Perfect Phoenix" && file !== "Dark Perfect Phoenix" && file !== "Victory Valkyrie Legend God Ver." && file !== "Guardian Kerbeus Red Ver." && file !== "Demon Destroying Bey" && file !== "Demonic Armageddon" && file !== "Brave Solomon" && file !== "Baldur" && file !== "Amaterios" && file !== "Seig Xcalibur");
for (const file of legendarybeyFiles) {
    const legendarybey = require(`c:/beycordplus/beys/${file}`);
    const legendarybeyc = new legendarybey("1", "1");
    client.legendarybeys.set(legendarybeyc.name, legendarybey);
}


//Black Beys
const blackbeyFiles = fs.readdirSync('c:/beycordplus/beys').filter(file => file.endsWith(".js") && file !== "Beyblade.js" && file !== "Ace Dragon" && file !== "Acid Anubis" && file !== "Air Knight" && file !== "Alter Chronos" && file !== "Arc Bahamut" && file !== "Archer Hercules" && file !== "Beast Behemoth" && file !== "Beat Kukulkan" && file !== "Blast Jinnius" && file !== "Blaze Ragnarok" && file !== "Bloody Longinus" && file !== "Bushin Ashura" && file !== "Buster Xcalibur" && file !== "Chaos" && file !== "Cho-Z Spriggan" && file !== "Cho-Z Valkyrie" && file !== "Crash Ragnaruk" && file !== "Dark Deathscyther" && file !== "Dark Perfect Phoenix" && file !== "Dead Hades" && file !== "Dead Phoenix" && file !== "Deathscyther" && file !== "Deep Chaos" && file !== "Diomedes D2" && file !== "Draciel Shield" && file !== "Dragoon Storm" && file !== "Drain Fafnir" && file !== "Dranzer Spiral" && file !== "Driger Slash" && file !== "Earth Aquila" && file !== "Erase Diabolos" && file !== "Evil-eye" && file !== "Exceed Evil-eye" && file !== "Fang Fenrir" && file !== "Flame Sagittario" && file !== "Gaia Dragoon" && file !== "Galaxy Zeus" && file !== "Geist Fafnir" && file !== "Gigant Gaia" && file !== "God Valkyrie" && file !== "Guardian Kerbeys" && file !== "Hell Salamander" && file !== "Holy Horusood" && file !== "Horusood" && file !== "Hyrus H2" && file !== "Inferno Ifrit" && file !== "Istros I2" && file !== "Jail Jormungand" && file !== "Judgement Joker" && file !== "Kaiser Kerbeus" && file !== "Kerbeus" && file !== "Killer Deathscyther" && file !== "King Kerbeus" && file !== "Kreis Satan" && file !== "Legend Spriggan" && file !== "Lightning L-Drago" && file !== "Lost Longinus" && file !== "Mad Minoborus" && file !== "Maximum Garuda" && file !== "Minoboros" && file !== "Neptune" && file !== "Nightmare Longinus" && file !== "Nova Neptune" && file !== "Obelisk Odin" && file !== "Odin" && file !== "Orpheus O2" && file !== "Prime Apocalypse" && file !== "Psychic Phantom" && file !== "Quad Quetzalcoatl" && file !== "Ragnaruk" && file !== "Revive Phoenix" && file !== "Rising Ragnaruk" && file !== "Rock Leone" && file !== "Screw Trident" && file !== "Shelter Regulus" && file !== "Sieg Xcalibur" && file !== "Slash Valkyrie" && file !== "Spriggan" && file !== "Storm Pegasus" && file !== "Spryzen Requiem" && file !== "Strike God Valkyrie" && file !== "Surtr S2" && file !== "Tornado Wyvern" && file !== "Trident" && file !== "Twin Nemesis" && file !== "Tyros T2" && file !== "Unicorn" && file !== "Union Achilles" && file !== "Unlock Unicorn" && file !== "Valkyrie" && file !== "Variant Lucifer" && file !== "Venom Diabolos" && file !== "Victory Valkyrie" && file !== "Wild Wyvern" && file !== "Winning Valkyrie" && file !== "Wizard Fafnir" && file !== "World Spriggan" && file !== "Wyvern" && file !== "Xcalibur" && file !== "Xeno Xcalibur" && file !== "Yaegar Yggdrasil" && file !== "Yggdrasil" && file !== "Z Achilles" && file !== "Zillion Zeus" && file !== "Lost 288548939156684811" && file !== "Cho-Z Achilles" && file !== "Shamrock Pegasus" && file !== "Stardust Pegasus" && file !== "Momentum Pegasus" && file !== "Excuse Pegasus" && file !== "Za Warudo Spriggan" && file !== "Flaming Hot Cheeto" && file !== "Breezing Cool Cheeto" && file !== "Lunar Minoboros" && file !== "Hallow Xcalibur" && file !== "Perfect Phoenix" && file !== "Black Perfect Phoenix" && file !== "Dark Perfect Phoenix" && file !== "Victory Valkyrie Legend God Ver." && file !== "Guardian Kerbeus Red Ver." && file !== "Demon Destroying Bey" && file !== "Demonic Armageddon" && file !== "Brave Solomon" && file !== "Baldur" && file !== "Amaterios" && file !== "Seig Xcalibur");
for (const file of blackbeyFiles) {
    const blackbey = require(`c:/beycordplus/beys/${file}`);
    const blackbeyc = new blackbey("1", "1");
    client.blackbeys.set(blackbeyc.name, blackbey);
}


//Unknown Beys
const availablebeyFiles = fs.readdirSync('c:/beycordplus/availablebeys').filter(file => file.endsWith(".js") && file !== "Beyblade.js");
for (const file of availablebeyFiles) {
    const availablebey = require(`c:/beycordplus/availablebeys/${file}`);
    const availablebeyc = new availablebey("1", "1");
    client.availablebeys.set(availablebeyc.name, availablebey);
}


//Items
const itemFiles = fs.readdirSync('./items').filter(file => file.endsWith(".js") && file !== "Part.js" && file !== "Beyblade.js" && file !== "Quest.js");
for (const file of itemFiles) {
    const item = require(`./items/${file}`);
    client.items.set(item.name || item.help.name, item);
}


//Guild joining
client.on("guildCreate", (guild) => {
    guild.channels.filter(ch => ch.isText()).each(ch => {
        mongo.db("main").collection("channels").insertOne({ _id: ch.id, bey: "nothing", type: "nothing", answer: "number", settings: { spawn: true, dcommands: [] } })
    })
});


//On Message Sent
client.on('messageCreate', async (message) => {
    const db = mongo.db("main");
    //RNG
    const testForNumber = Math.floor(Math.random() * 30);
    const available = ["Ace Dragon", "Acid Anubis", "Air Knight", "Alter Chronos", "Arc Bahamut", "Archer Hercules", "Beast Behemoth", "Beat Kukulcan", "Blast Jinnius", "Blaze Ragnarok", "Bloody Longinus", "Bushin Ashura", "Buster Xcalibur", "Chaos", "Cho-Z Spriggan", "Cho-Z Valkyrie", "Crash Ragnaruk", "Dark Deathscyther", "Dead Phoenix", "Dead Hades", "Deathscyther", "Deep Chaos", "Diomedes D2", "Draciel Shield", "Dragoon Storm", "Drain Fafnir", "Dranzer Spiral", "Driger Slash", "Earth Aquila", "Emperor Forneus", "Erase Diabolos", "Evil-eye", "Exceed Evil-eye", "Fang Fenrir", "Flame Sagittario", "Gaia Dragoon", "Galaxy Zeus", "Geist Fafnir", "Gigant Gaia", "God Valkyrie", "Guardian Kerbeys", "Hell Salamander", "Holy Horusood", "Horusood", "Hyrus H2", "Inferno Ifrit", "Istros I2", "Jail Jormungand", "Judgement Joker", "Kaiser Kerbeus", "Kerbeus", "Killer Deathscyther", "King Kerbeus", "Kreis Satan", "Legend Spriggan", "Lightning L-Drago", "Lost Longinus", "Mad Minoborus", "Maximum Garuda", "Minoboros", "Neptune", "Nightmare Longinus", "Nova Neptune", "Obelisk Odin", "Odin", "Orpheus O2", "Prime Apocalypse", "Psychic Phantom", "Quad Quetzalcoatl", "Ragnaruk", "Revive Phoenix", "Rising Ragnaruk", "Rock Leone", "Screw Trident", "Shelter Regulus", "Sieg Xcalibur", "Slash Valkyrie", "Spriggan", "Storm Pegasus", "Storm Spriggan", "Spryzen Requiem", "Strike God Valkyrie", "Surtr S2", "Tornado Wyvern", "Trident", "Twin Nemesis", "Tyros T2", "Unicorn", "Union Achilles", "Unlock Unicorn", "Valkyrie", "Variant Lucifer", "Venom Diabolos", "Victory Valkyrie", "Wild Wyvern", "Winning Valkyrie", "Wizard Fafnir", "World Spriggan", "Wyvern", "Xcalibur", "Xeno Xcalibur", "Yaeger Yggdrasil", "Yggdrasil", "Z Achilles", "Zillion Zeus"]
    if (testForNumber == 0) {
        try {
            client.spawns.get('spawnsystem').run(message, prefix, db, available, client);
        } catch (error) {
            let now = new Date();
            let startembed = new Discord.MessageEmbed()
                .setTitle('lol bad imagine no spawn')
                .setDescription(error)
                .setColor("#fa2c2c")
                .setTimestamp()
            message.channel.createMessage({ embed: startembed });
            console.log(error);
        }
    }
    //BossRNG
    const bosschance = Math.floor(Math.random() * 100);
    const bosss = ["Shu", "Valt", "Star Fatinum"];
    if (bosschance == 0) {
        try {
            client.boss.get('bosssystem').run(message, prefix, db, client, bosss);
        } catch (error) {
            let now = new Date();
            let startembede = new Discord.MessageEmbed()
                .setTitle('lol bad imagine no boss')
                .setDescription(error)
                .setColor("#fa2c2c")
                .setTimestamp()
            message.channel.createMessage({ embed: startembede });
            console.log(error);
        }
    }

    //Command Handler Pt.2
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    message.reply = content => {
        client.createMessage(message.channel.id, `<@${message.author.id}>, ${content}`);
    }
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command)

    try {
        cmd.run(client, message, args, prefix, {}, db);
    } catch (error) {
        console.error(error);
        message.reply(`something happened while trying to run this command. Whizzie just stupid ez.`);
    }
});

//Connect client
client.on('ready', () => {
    console.log('Beycord+ is online.');
});
client.connect();