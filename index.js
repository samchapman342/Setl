const botsettings = require('./botsettings.json')
const Discord = require("discord.js")
const client = new Discord.Client();
const PREFIX = "!"
client.on('ready', async() => {

    console.log("Bot is Ready")
});

require("./util/eventHandler")(client)

const fs = require("fs");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't Find Commands!");
    }


    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        client.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        })
    })
});

client.on("message", async message => {
    if(message.author.client || message.channel.type === "dm") return;

    let prefix = clientsettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
})



client.login(botsettings.token);











 











