const reqEvent = (event) => require(`../events/${event}.js`)

module.exports = bot => {
    bot.on("ready", function() {reqEvent("ready") (bot) });
 }