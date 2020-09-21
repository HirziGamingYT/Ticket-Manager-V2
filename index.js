const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");



client.on("ready",()=>{
    console.log("TicketBot is online!");
    client.user.setActivity("type t!help to get started");
});

client.on("message",async message=>{
    if(message.author.bot||message.type=="dm")return;
    var arg = message.content.toLowerCase().split("!");` //Change this if you dont wanna use the "!" thing 
    if(arg[0]!='t')return; //If you wanna Change your prefix just simply Change "t" to your prefix 
    if(!message.guild.me.hasPermission("MANAGE_CHANNELS")||!message.guild.me.hasPermission("MANAGE_ROLES")){
        var errp = new Discord.RichEmbed()
                .setTitle("Ticket Support | Error!")
                .setDescription("Error! I need `MANAGE_CHANNEL` and `MANAGE_ROLES` permission!")
                .setFooter("Ticket Manager | Bugs may occur!")
        message.reply(errp)
        return;
    }
    let TicketCategory = message.guild.channels.find(channel=>channel.name==="Tickets");
    if(TicketCategory==null){
        await message.guild.createChannel('Tickets', {
            type: 'category',
            permissionOverwrites: [{
              id: message.guild.id,
              deny: ['READ_MESSAGES']
            }]
          })
          .then(t=>TicketCategory=t)
          .catch(console.error);
    }
    switch (arg[1]) {
        case "new":
            ticket = new Discord.RichEmbed()
            .setTitle("Hi "+message.author.username+"!")
            .setDescription("Thank you for contacting support! While we wait together I recommend you to check out support team timezone to make sure you understand the timings that you could get a response at.")
            .setFooter("Ticket Manager | Bugs may occur!")
            .setColor('#32cd32');
            let roles = message.guild.roles.filter(x=>x.hasPermission("MANAGE_CHANNELS"));
            let perms=[];
            roles.forEach(role => {
               perms.push( 
                    {
                        id:role.id,
                        allow:["READ_MESSAGES"]
                    }
                )
              });
              perms.push(
                    {
                        id:message.guild.id,
                        deny: ["READ_MESSAGES"]
                    },
                    {
                        id: message.author.id,
                        allow:["READ_MESSAGES"]
                    }
              );
            message.guild.createChannel(message.author.username+" ticket",{
                type: "text",
                parent: TicketCategory.id,
                permissionOverwrites: perms
            }).then(channel=>channel.send(ticket))
            var Success = new Discord.RichEmbed()
                .setTitle("Ticket Opened")
                .setDescription("<a:yes:747788284066922562><@"+message.author.id+"> Success create your ticket")
                .setFooter("Ticket Manager | Bugs may occur!")
            message.reply(Success);
            break;
        case "close":
            var err = new Discord.RichEmbed()
                .setTitle("Ticket Support | Error!")
                .setDescription("The command is only built for a ticket channel.")
                .setFooter("Ticket Manager | Bugs may occur!")
            var errd = new Discord.RichEmbed()
                .setTitle("Ticket Support | Error!")
                .setDescription("Error! I cannot delete this channel!")
                .setFooter("Ticket Manager | Bugs may occur!")
            var con = new Discord.RichEmbed()
                .setTitle("Ticket Support | Confirm!")
                .setDescription("Are you sure you want to close this ticket?\nType `yes` to confirm And type **Any Message** to cancel.")
                .setFooter("Ticket Manager | Bugs may occur!")
            var dmm = new Discord.RichEmbed()
                .setTitle("Ticket Closed!")
                .setDescription("**Closed By:** <@"+message.author.id+">\n**Reason: Automated response:** This message is sent to inform that your support ticket has reached the end of it's conversation. We hope you're satisifed!")
                .setFooter("Ticket Manager | Bugs may occur!")
            if(!message.channel.name.endsWith("ticket")){
                message.reply(err);
                break;
            }
            message.reply(con);
            
            const collector = message.channel.createMessageCollector(
                m=>m.content.toLowerCase().startsWith("yes")&&m.author.id==message.author.id,
                {time:20000,max:1}
            );
            collector.on('collect', m => {
                if(!m.channel.deletable)message.reply(errd);
                else m.channel.delete();
                if(!m.channel.delete)message.author.send(dmm);
              });
            break;
        case "ping":
            message.channel.send("<:pong:757446940274458695>Pong!**Ping:**")
            message.channel.send(`**${client.ping}Ms**`)
            break;
        case "uptime": 
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;
            let uptime = (`${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`); 
            message.channel.send(`**${days}** days,** ${hours}** hours,**${minutes}** minutes and **${seconds}** seconds`); 
            break;
        case "help":
            var help = new Discord.RichEmbed()
                .setTitle("<a:yes:747788284066922562> Hello "+message.author.username+"!")
                .setDescription("How to create a ticket? Use the commands in any channel of the discord server.")
                .addField("t!new","Create a private channel with you and staff to solve to issuse together!")
                .addField("t!close","Issue is solved? then you can delete the channel with ticket delete")
                .addField("t!ping","Check my ping")
                .addField("t!uptime","Check my uptime")
                .addField("t!add","Add other user to ticket")
                .addField("t!remove","Remove user from ticket")
                .addField("t!info","View my Information")
                .addField("Invite","Link:\nhttps://discord.com/oauth2/authorize?client_id=745979860392083486&scope=bot&permissions=8")
                .setFooter("Ticket Manager")
                .setColor('#32cd32');
            message.reply(help);
            break;
        case "forceclose":
             message.channel.send(" still in WIP")
            break;
        case "old":
            message.channel.send("Im old but new :D");
            break;
        case "im old but new":
            message.reply("yes you are :D")
            break;
        case "add":
            message.reply("Coming Soon")
            break;
        case "remove":
            message.reply("Coming Soon")
            break;
        case "info":
            var info = new Discord.RichEmbed()
                .setTitle("Who Is Me?")
                .setDescription("Ticket Manager is a Ticket bot made by HirziGamingYT#8701 and GARUDA_2703#6266 and made for the Discord Server. It helps run the server and has fun commands! Ticket Manager is also make a private channel for helping user who need help. Ticket Manager is always being updated with tons of new commands each day!")
                .setFooter("Ticket Manager, made with ❤️ by Hirzi and Garuda")
                message.reply(info)
            break;
        default:
            break;
    }
});







client.login(config.token);
