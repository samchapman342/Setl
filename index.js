const botsettings = require('./botsettings.json')
const Discord = require("discord.js")
const client = new Discord.Client();
const prefix = "!"
client.on('ready', async() => {

    console.log("Bot is Ready")
});

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
  console.log(message.content)
    if(message.author.bot || message.channel.type === "dm") return;
    console.log(message.content)

    let messageArray = message.content.toLowerCase().split(" ");
let command = messageArray[0];
let args = messageArray.slice(1);

if(!command.startsWith(prefix)) return;

let cmd = client.commands.get(command.slice(prefix.length));
if(cmd) cmd.run(client, message, args);
})



client.login(botsettings.token);





















