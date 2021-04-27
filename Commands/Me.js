const Discord = require("discord.js");
const Database = require("../Helpers/Database");


exports.run = async (client, message, args) => {
    const db = new Database("./Servers/" + message.guild.id, "Invites");
    var victim = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    var data = db.get(`invites.${victim.id}`) || { total: 0, fake: 0, inviter: null, regular: 0, bonus: 0, leave: 0 };
    var embed = new Discord.MessageEmbed()
    .setDescription(`You have **${(data.total || 0) + (data.bonus || 0)} **  invites:clap:! \n 
     :white_check_mark: **${data.regular || 0}  ** regular, **\n
      :sparkles: ${data.bonus || 0}  ** bonus, **\n
      :x: ${data.leave || 0}  ** leaves, **\n
      :poop: ${data.fake || 0}  ** fake \n
      Share this server with your friends for more :wink:`) 
    .setColor("RANDOM");
    message.channel.send(embed);
};

exports.conf = {
    commands: ["invites"],
    usage: "[p]invites",
    enabled: true,
    guildOnly: true
};
