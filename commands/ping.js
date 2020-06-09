module.exports = {
    name: "ping",
    description: "pong",

execute (client, message, args) {
        message.channel.send("pong")
    }
}



