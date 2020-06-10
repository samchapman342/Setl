const Discord = require("discord.js")

module.exports = bot => { 
    console.log(`${bot.user.username} is online`)
    bot.user.setActivity("Twitch-YoNemean", {type: "STREAMING", url:"https://twitch.tv/yonemean"});
}