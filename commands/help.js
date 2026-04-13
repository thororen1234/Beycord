const Discord = require('discord.js');

module.exports.run = async (client, message, args, prefix, player, db) => {
  if(args[0] && args[0].toLowerCase() == "claim"){
    message.channel.createMessage(
    { name: 'Claiming', value: 'To claim, do `;claim <answer> <type>`.'},
    { name: 'Answers', value: 'The answer to the math questions will always fall between the range of 0 to 40 and that its only addition.'},
    { name: 'Types', value: 'For Beyblades, there are only 4 types. `Attack`, `Stamina`, `Defence` and `Balance`.'}
    )
  }
  if(args[0] && args[0].toLowerCase() == "general"){
    message.channel.createMessage(
    { name: 'attach', value: 'Attach an item to a Bey.' },
    { name: 'balance', value: 'Shows your currencies.' },
    { name: 'botinfo', value: 'Basic information about the bot.' },
    { name: 'clear', value: 'Clear your duplicated Beys. Leaving the highest leveled, starreds, Buddy Beys and your starter, level 100s, blacks and exclusives behind.' },
    { name: 'current', value: 'Shows your current equipped bey.' },
    { name: 'debug', value: 'Debugs a Bey to find bugs and potentially fixes it.' },
    { name: 'detach', value: 'Detach an item from a Bey.' },
    { name: 'equip', value: 'Equip a bey from your inventory.' },
    { name: 'info', value: 'See information about a specific bey.' },
    { name: 'inventory', value: `Show someone's inventory.` },
    { name: 'iteminventory', value: 'View your inventory of items' },
    { name: 'knownbugs', value: 'Displays all known bugs.'},
    { name: 'launcher', value: 'Equip, unequip and view your launchers' },
    { name: 'part', value: `Check for a Bey part's information.` },
    { name: 'partinventory', value: 'View what Bey parts you have in your inventory.' },
    { name: 'pay', value: 'Pay someone with Valtz.' },
    { name: 'ping', value: 'Shows how fast the bot is working.' },
    { name: 'quests', value: 'currently down lol' },
    { name: 'rankup', value: 'Rank up and receive rewards. You need 100 wins to rank up.' },
    { name: 'resetstates', value: 'Reset your states data in case you are stuck in a battle or prompt.' },
    { name: 'search', value: 'Search for a Bey using simple queries.' },
    { name: 'settings', value: 'Change your user preferences' },
    { name: 'shard', value: 'Displays the ID of the shard that the server belongs to.' },
    { name: 'shop', value: 'Shop for beys!' },
    { name: 'sort', value: 'Sort your inventory to find Beys faster.' },
    { name: 'star', value: 'Star or unstar a Bey.' },
    { name: 'stars', value: 'View all of the starred Beys.' },
    { name: 'start', value: 'Start the game.' },
    { name: 'switch', value: `Changes the Bey's spin direction. (if possible).` },
    { name: 'transactionhistories', value: 'Check your trade and payment history.' },
    { name: 'upgrade', value: `Upgrades your equipped Bey to it's next generation.` }
    )
  }
  
  let now = new Date();
  let startembed = new Discord.MessageEmbed()
  .setTitle('Help')
  .setColor("#7f7fff")
  .addFields(
    {name: 'general', value: 'Do `;help general` for the general use commands'},
    {name: 'claim', value: 'Do `;help claim` for help in claiming Beys'},
    
  )
  .setTimestamp();
  message.channel.createMessage({embed:startembed});
}

module.exports.help = {
  name: "help"
}