const Discord = require('discord.js')
var weather = require('weather-js');

module.exports = {
	name: 'weather',
	description: 'get weather info',
	execute: async(client,message, args) => {
        if(!args.length) {
            return message.channel.send("Please give the weather location")
          }
          
       weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
      try {
       
      let embed = new Discord.MessageEmbed()
      .setTitle(`Weather - ${result[0].location.name}`)
      .setColor("#ff2050")
      .setDescription("Temperature units can differ sometimes")
      .addField("Temperature", `${result[0].current.temperature} Fahrenheit`, true)
      .addField("Sky Text", result[0].current.skytext, true)
      .addField("Humidity", result[0].current.humidity, true)
      .addField("Wind Speed", result[0].current.windspeed, true)//What about image
      .addField("Observation Time", result[0].current.observationtime, true)
      .addField("Wind Display", result[0].current.winddisplay, true)
      .setThumbnail(result[0].current.imageUrl);
         message.channel.send(embed)
      } catch(err) {
        return message.channel.send("Unable To Get the data of Given location")
      }
      });   
	},
};


module.exports.config = {
    name: "weather",
    description: "shows weather",
    usage: "!weather",
    accessableby: "weather",
    aliases: ['w', 'weather']
}