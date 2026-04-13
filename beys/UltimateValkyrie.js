const Beyblade=require("./Beyblade.js");
class UltimateValkyrie extends Beyblade {
    constructor(e,s){super("Ultimate Valkyrie","Attack","https://cdn.discordapp.com/attachments/1032009191960887388/1033791599827763230/ulti2-removebg-preview.png",e,s),
        this.specials=[{name:"Ultimate Dive",requires:function(e,s,t){return e.sp>3},execute:function(e,s,t){s.hp=s.hp-150;let a=(new Discord.MessageEmbed).setTitle(`[${e.username}] Ultimate Valkyrie used **Ultimate Dive**. Ultimate Valkyrie soares through the air and lands on ${s.bey.bbname||s.bey.name}. 150 damage dealt.`).setColor("#551a8b");t.channel.send(a)}}],
        this.passives=[{name:"Break",requires:function(e,s,t){return!1},execute:function(e,s,t){s.hp=s.hp-28;let a=(new Discord.MessageEmbed).setTitle(`Uh oh, [${e.username}] ${e.bey.bbname||e.bey.name} tried to use its passive ability but it was not set up properly. 28 damage dealt.`).setDescription("Please report this at the support server.").setColor("#551a8b");t.channel.createMessage({embed:a})},cd:180}],
        this.modes=[],
        this.sd=0,
        this.sdchangable=!1,
        this.aliases=[]
    }
}

    module.exports=UltimateValkyrie;