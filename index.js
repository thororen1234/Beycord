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
/*const spawnFiles = fs.readdirSync(`./systems`).filter(file => file.endsWith("js") && file !== "bosssystem.js");
for(const file of spawnFiles){
    const spawn = require(`./systems/${file}`)
    client.spawns.set(spawn.name || spawn.help.name, spawn)
}


//Boss System
const bossFiles = fs.readdirSync(`./systems`).filter(file => file.endsWith("js") && file !== "spawnsystem.js");
for(const file of bossFiles){
    const bosssystem = require(`./systems/${file}`)
    client.boss.set(bosssystem.name || bosssystem.help.name, bosssystem)
}


//Bosses
const bosstypeFiles = fs.readdirSync(`./bosses`).filter(file => file.endsWith("js"));
for(const file of bosstypeFiles){
    const bosses = require(`./bosses/${file}`)
    client.bosses.set(bosses.name || bosses.help.name, bosses)
}*/


//Beys
const beyFiles = fs.readdirSync('./beys').filter(file => file.endsWith(".js") && file !== ".gitignore" && file !== "Beyblade.js");
for (const file of beyFiles) {
    const bey = require(`./beys/${file}`);
    const beyc = new bey("1", "1");
    client.beys.set(beyc.name, bey);
}

//Items
/*const itemFiles = fs.readdirSync('./items').filter(file => file.endsWith(".js") && file !== "Part.js" && file !== "Beyblade.js" && file !== "Quest.js");
for (const file of itemFiles) {
    const item = require(`./items/${file}`);
    client.items.set(item.name || item.help.name, item);
}*/


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
    console.log('Beycord is online.');
});
client.connect();
