const Beyblade=require("./Beyblade.js");
class BloodshotEvileye extends Beyblade {
    constructor(e,s){super("Bloodshot Evil-eye","Defense","https://cdn.discordapp.com/attachments/1032009191960887388/1033821274310447185/imageedit_1_3139363619.png",e,s),
        this.specials=[{name:"Bloody Call",requires:function(e,s,t){return e.sp>3},execute:function(e,s,t){s.hp=s.hp-150;let a=(new Discord.MessageEmbed).setTitle(`[${e.username}] Bloodshot Evil-eye used **Bloody Call**. Bloodshot's call has been received! 150 damage dealt.`).setColor("#551a8b");t.channel.send(a)}}],
        this.passives=[{name:"Misaki's Something",requires:function(e,s,t){return!1},execute:function(e,s,t){s.hp=s.hp-28;let a=(new Discord.MessageEmbed).setTitle(`Uh oh, [${e.username}] ${e.bey.bbname||e.bey.name} tried to use its passive ability but it was not set up properly. 28 damage dealt.`).setDescription("Please report this at the support server.").setColor("#551a8b");t.channel.createMessage({embed:a})},cd:180}],
        this.modes=[],
        this.sd=0,
        this.sdchangable=!1,
        this.aliases=[]
    }
}

    module.exports=BloodshotEvileye;