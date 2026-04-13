//Ok this so for you who likes to know what really happens behind the scenes because making a Bey seems too easy to be true.

//Import the require modules
const Discord = require("discord.js");
const Eris = require("eris");
const fs = require("fs");

//The legendary Beyblade class that shortens everything!!!
class Beyblade {
  /**
  @param {String} name - The Bey's name
  @param {String} type - The Bey's type
  @param {String} image - The Bey's (high quality) image
  @param {String} firstOwner - The Bey's first owner's ID (not yours)
  @param {number} id - The Bey's ID [Optional]
  */
  constructor(name, type, image, special, firstOwner, id){
    //Set up the Bey's information
    this.name = name;
    this.type = type;
    this.image = image;
    this.firstOwner = firstOwner;
    this.move = special;
    this.level = 1;
    this.xp = 0;
    this.id;
    
    //Checks if a ID is provided. If not, generate a new one.
    if(id){
    this.id = id;
      return;
    }
    let ids = JSON.parse(fs.readFileSync("../beyids.json", "utf8"));
    if(!ids[this.name]){
      ids[this.name] = {
        latest: 0
      };
    }
    let iid = ids[this.name].latest + 1;
    this.id = iid;
    ids[this.name].latest = iid;
    fs.writeFile("../beyids.json", JSON.stringify(ids), err => {
    if (err) console.log(err);
  });
    let beyid = this.id
  }
  special(acted, victim, message, player){
    //Resets the energy of a player.
    acted.energy = 0;
  }
  displayInfo(message){
    //Displays the info of the Bey. This is what appears when you do the ;info or ;current command.
    let embed = new Discord.RichEmbed()
    .setColor("#7f7fff")
    .setTitle(`**${this.name}**'s Information`)
    .setThumbnail(this.image)
    .addField("Level", this.level)
    .addField("EXPs", this.xp)
    .addField("Type", this.type)
    .addField("Special Move", this.move)
    .addField("ID", this.id)
    .addField("Original Blader ID",  this.firstOwner);
    
    message.channel.createMessage({embed: embed});
  }
}

//The Beyblade class is born!!!
module.exports = Beyblade;
