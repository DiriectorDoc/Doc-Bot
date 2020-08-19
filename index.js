const Discord = require("discord.js"),
	  bot = new Discord.Client(),
	  token = /* Not included for security reasons */,
	  modIDs = [/* Not included for security reasons */];

function modOnly(msg, call){
	if(modIDs.some(id => id === msg.author.id)){
		call()
	} else {
		msg.reply("Excuse me. Are you an admin? No? I didn't think so. Lay of the admin commands, m'kay.")
	}
}

function compileDM(msg){
	return "Message from " + msg.author.toString() + "\n-----\n" + msg.content;
}

bot.on("ready", function(){
	console.log("Doc Bot is online")
})

bot.on("message", function(msg){
	if(msg.author.bot)
		return;
	if(msg.channel.name == "talk-to-the-doc"){
		if(msg.author.id != modIDs[0]){
			bot.users.fetch(modIDs[0], false).then(user => {
				user.send(compileDM(msg))
			})
		console.log(msg)
		}
		return
	}
	if(msg.content.match(/^!.+/g)){
		let args = msg.content.split(" ");
		switch(args.shift().substring(1)){
			case "notify":
				modOnly(msg, () => {
					msg.channel.send("@everyone " + args.join(" "))
				})
				break;
			case "stop":
				modOnly(msg, () => {
					throw "Doc Bot has been sucessfully stopped."
				})
				break;
			default:
				msg.reply("What were you thinking? That's not a command.")
		}
	}
})

bot.login(token)