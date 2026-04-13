const Beyblade=require("./Beyblade.js");
class Thororen extends Beyblade {
    constructor(e,s){super("thororen","Attack","https://cdn.discordapp.com/attachments/999683623248736379/1031988350564966461/circle-cropped_2.png",e,s),
        this.specials=[{name:"Ban Hammer",requires:function(e,s,t){return e.sp>3},execute:function(e,s,t){s.hp=s.hp-200;let a=(new Discord.MessageEmbed).setTitle(`[${e.username}] thororen used **Ban Hammer**. 200 damage dealt.`).setColor("#551a8b");t.channel.send(a)}}],
        this.passives=[{name:"Break",requires:function(e,s,t){return!1},execute:function(e,s,t){s.hp=s.hp-28;let a=(new Discord.MessageEmbed).setTitle(`Uh oh, [${e.username}] ${e.bey.bbname||e.bey.name} tried to use its passive abilitity but it was not set up properly. 28 damage dealt.`).setDescription("Please report this at the support server.").setColor("#551a8b");t.channel.createMessage({embed:a})},cd:180}],
        this.modes=[],
        this.sd=0,
        this.sdchangable=!1,
        this.aliases=[]
    }
}

    module.exports=Thororen;
