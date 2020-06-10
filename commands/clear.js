module.exports = {
    name: "clear", 
    category: "moderation",
    description: "Clears recent messages",
      aliases: ["purge"],
    usage: '!clear <amount>',
    run: async (client, message, args) => { // depending on your code, it might start under here
      if (!message.member.permissions.has("MANAGE_MESSAGES")) // sets the permission
        return message.channel.send(
          `You do not have correct permissions to do this action, ${message.author.username}` // returns this message to user with no perms
        );
      let deleteAmount;
  
      if (parseInt(args[0]) > 100) {
        deleteAmount = 100;
      } else {
          deleteAmount = parseInt(args[0]);
      }
  
        message.channel.bulkDelete(deleteAmount, true);
        
        message.channel.send(`Successfully deleted ${deleteAmount}`).then(m => m.delete({timeout: 5000})) // Sents a temp message for 5 seconds = 5000 ms
        console.log(
          `Total messages deleted ${deleteAmount} in ${message.guild.name}` // logs how many messages were deleted, and in what server
        );
    },
  };
  

module.exports.config = {
    name: "clear",
    description: "clears message",
    usage: "!clear",
    accessableby: "Members",
    aliases: ['c', 'purge']
}