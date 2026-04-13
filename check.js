const fs = require("fs");
const Discord = require("discord.js");
let list = new Discord.Collection();

async function check(){
fs.readdir("./kit/beys/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js" && f !== "template.js");
  if (jsfile.length <= 0) {
    throw "No Bey found. Please make a Bey first."
  }

  jsfile.forEach((f, i) => {
    let props = require(`./kit/beys/${f}`);
    let bey = new props("123", 1);
    if(!bey.name) throw `${f} incomplete. No name found.`;
    if(!bey.type) throw `${f} incomplete. No type found.`;
    if(!bey.move) throw `${f} incomplete. No special move name found.`;
    if(!bey.image) throw `${f} incomplete. No image found.`;
    console.log(`${f} checked!`);
  });
});
}

check();
console.log("All Beys checked and are ready to be submitted!");
