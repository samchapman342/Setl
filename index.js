const Discord = require('discord.js');
const botsettings = require('./botsettings.json');

const client = new Discord.Client({disableEveryone: true});

client.on("guildMemberAdd", member => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome')
    welcomeChannel.send (`Welcome! ${member}`)
})

require("./util/eventHandler")(client)

const fs = require("fs");
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         console.log("[LOGS] Couldn't Find Commands!");
         return;
    }

    console.log(`Loading commands!`);

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        console.log(`Command "${f}" loaded!`)
        client.commands.set(pull.config.name, pull);
        if(pull.config.aliases) {
          pull.config.aliases.forEach(alias => {
            client.commands.set(alias, pull)
          })
        }
    });
});

client.on("message", async message => {
    if(message.author.client || message.channel.type === "dm") return;

    let prefix = botsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = message.content.substring(message.content.indexOf(' ')+1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)

})




client.on('message', message => {
  if(message.content.startsWith(`${PREFIX}createticket`)) {
    const ticketChannel = message.guild.channel.cache.find(channel => channel.name.toLowerCase() === `${message.author.username}s-ticket`.toLowerCase())
    if(ticketChannel) {
      message.channel.send("You already have a open ticket")
    } else {
      message.guild.channels.create(`${message.author.username}s-ticket`, {
        type: 'text',
        permissionOverwrites: [
          {
            allow: 'VIEW_CHANNEL',
            id: message.author.id
          },
          {
            deny: 'VIEW_CHANNEL',
            id: message.guild.id
          
          }
        ]
      })
      message.channel.send("Your ticket has now been created")
    
   }
}
   if(message.content.startsWith(`{PREFIX}closeticket`)) {
     const ticketChannel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === `${message.author.username}s-ticket`.toLocaleLowerCase())
     if(!ticketChannel) {
       message.channel.send("You don\'t have an open ticket")
     } else {
       ticketChannel.delete()
       message.channel.send("Your ticket has now been closed")
     }

}



client.login(botsettings.token);

})
