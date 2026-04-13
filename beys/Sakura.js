const Beyblade=require("./Beyblade.js");
class Sakura extends Beyblade {
    constructor(e,s){super("Sakura","Attack","https://cdn.discordapp.com/attachments/1029534328448884818/1032350446024671322/Untitled191_20221019125149.png",e,s),
        this.specials=[{name:"Special",requires:function(e,s,t){return e.sp>2},execute:function(e,s,t){s.hp=s.hp-10000;let a=(new Discord.MessageEmbed).setTitle(`[${e.username}] Sakura used **Leaf Storm**. 10000 damage dealt.`).setColor("#551a8b");t.channel.send(a)}}],
        this.passives=[{name:"Passive",requires:function(e,s,t){return!1},execute:function(e,s,t){s.hp=s.hp-28;let a=(new Discord.MessageEmbed).setTitle(`Uh oh, [${e.username}] ${e.bey.bbname||e.bey.name} tried to use its passive ability but it was not set up properly. 28 damage dealt.`).setDescription("Please report this at the support server.").setColor("#551a8b");t.channel.createMessage({embed:a})},cd:180}],
        this.modes=[],
        this.sd=0,
        this.sdchangable=!1,
        this.aliases=[]
    }
}

    module.exports=Sakura;
