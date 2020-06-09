const Discord = require("discord.js")
const client = new Discord.Client();
const PREFIX = "!"
client.on('ready', async() => {

    console.log("Bot is Ready")
});


const reqEvent = (event) => require(`../events/${event}`)

module.exports = bot => {


    bot.on("ready", function() {reqEvent("ready") (bot) });
 }









client.login(process.env.token);


 











