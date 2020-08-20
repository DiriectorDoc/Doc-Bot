const Discord = require("discord.js"),
	  bot = new Discord.Client(),
	  config = require('./config.json');

let self;

function modOnly(msg, call){
	if(config.modIDs.some(id => id === msg.author.id)){
		call()
	} else {
		msg.reply(
			[
				"Excuse me? ",
				"Ah, ah, ah. ",
				"What are you doing? ",
				"Stop right there! ",
				"Um...",
				"Um, no. "
			][Math.round(Math.random()*6)] +
			[
				"Are you an admin? No? I didn't think so. ",
				"You need to be an admin to use that command. ",
				"Only admins can do that. ",
				"You tried, but that's an admin-only command. "
			][Math.round(Math.random()*4)] +
			[
				"Lay of the admin commands, m'kay?",
				"Try a different command, you might have some luck.",
				"Use *!commands* to see the availible commands"
			][Math.round(Math.random()*3)]
		)
	}
}

function compileDM(msg){
	return "Message from " + msg.author.toString() + "\n-----\n" + msg.content;
}

bot.on("ready", function(){
	console.log("Doc Bot is online")
	bot.users.fetch(config.botID, false).then(bot => {
		self = bot;
	})
})

bot.on("message", function(msg){
	if(msg.author.bot)
		return;
	switch(msg.channel.name){
		case "talk-to-the-doc":
			if(msg.author.id != config.modIDs[0]){
				bot.users.fetch(config.modIDs[0], false).then(user => {
					user.send(compileDM(msg))
				})
			}
			return;
		case "promotion":
			bot.channels.fetch(config.archiveID).then(channel => {
				channel.send(new Discord.MessageEmbed({
					title: "Archived promotion",
					color: msg.member.displayHexColor,
					author: {
						name: msg.author.username + "#" + msg.author.discriminator,
						icon_url: msg.author.displayAvatarURL()
					},
					description: msg.content,
					footer: {
						text: new Date(msg.createdTimestamp).toUTCString().replace("GMT", "UTC")
					}
				}))
			})
			msg.delete({
				timeout: 86400000,
				reason: "Automatic. Promotions are deleted after 24 hours."
			})
			return;
		default:
			if(msg.content.match(/^!.+/g)){
				let args = msg.content.split(" ");
				switch(args.shift().substring(1)){
					case "commands":
						msg.reply(new Discord.MessageEmbed({
							title: "Commands",
							color: 0x3498DB,
							author: {
								name: "Doc Bot",
								icon_url: self.displayAvatarURL()
							},
							description: "list of commands",
							fields: [
								{
									name: "Commands",
									value: "`!commands`\n`!color`",
									inline: true
								},
								{
									name: "Purpose",
									value: "Displays this here list\nChanges username color",
									inline: true
								}
							],
							footer: {
								text: new Date().toUTCString().replace("GMT", "UTC")
							}
						}))
						break;
					case "color":
					case "colour":
						msg.guild.members.fetch(msg.author.id).then(guildMember =>{
							guildMember.roles.set(config.colourIDs[args[0].toLowerCase()] || [])
						})
						break;
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
	}
			
})

bot.login(config.token)