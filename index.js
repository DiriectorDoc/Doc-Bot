const Discord = require("discord.js"),
	  bot = new Discord.Client(),
	  config = require('./config.json');

let self;

/* Randomly picks on of and of the given parameters */
function pick(){
	return arguments[Math.round(Math.random()*arguments.length)]
}

/* Turns a date into a neatly formated date and time to be used in a sentence */
function fullDate(date) {
	return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getUTCDay()] + ", " +
		["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getUTCMonth()] + " " +
		date.getUTCDate() + ", " + date.getUTCFullYear() + ", " +
		"at " + date.getUTCHours + ":" + date.getUTCMinutes() + " UTC"
}

/* Checks who entered the command. If it was an admin, it executes the callback. Else, it replies with a randomly generated message. */
function modOnly(msg, call){
	if(config.modIDs.some(id => id === msg.author.id)){
		call()
	} else {
		msg.reply(
			pick(
				"Excuse me? ",
				"Ah, ah, ah. ",
				"What are you doing? ",
				"Stop right there! ",
				"Um...",
				"Um, no. ",
				"Hold it! ",
				"I don't think so. "
			) +
			pick(
				"Are you an admin? No? I didn't think so. ",
				"You need to be an admin to use that command. ",
				"Only admins can do that. ",
				"You tried, but that's an admin-only command. ",
				"Last time I checked, you aren't an admin. "
			) +
			pick(
				"Lay of the admin commands, m'kay?",
				"Try a different command, you might have some luck.",
				"Use __!commands__ to see the availible commands.",
				"I've heard that using __!commands__ tells you what you *can* do.",
				"Sorry, but you'll have to make do with some other commands."
			)
		)
	}
}

function msgCopy(title, msg){
	return new Discord.MessageEmbed({
		title: title,
		color: msg.member.displayHexColor,
		author: {
			name: msg.author.username + "#" + msg.author.discriminator,
			icon_url: msg.author.displayAvatarURL()
		},
		description: msg.content,
		fields: [
			{
				name: "Message ID",
				value: msg.id
			}
		],
		timestamp: new Date(msg.createdTimestamp)
	})
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
					user.send(msgCopy("Query", msg))
				})
			}
			return;
		case "promotion":
			bot.channels.fetch(config.channelIDs.archive).then(channel => {
				channel.send(msgCopy("Archived Promotion", msg))
			})
			msg.delete({
				timeout: 864e5,
				reason: "Automatic. Promotions are deleted after 24 hours."
			})
			return;
		case "console":
			eval(msg.content)
			return;
		default:
			if(msg.content.match(/^!.+/g)){
				let args = msg.content.split(" "),
					command = args.shift().substring(1);
				switch(command){
					case "about":
						msg.reply(new Discord.MessageEmbed({
							title: "About",
							color: 0x3498DB,
							author: {
								name: "Doc Bot",
								icon_url: self.displayAvatarURL()
							},
							thumbnail: {
								url: self.displayAvatarURL(),
							},
							description: "Doc Bot's info and stats",
							fields: [
								{
									name: "Version",
									value: "0.3.0",
									inline: true
								},
								{
									name: "Creator",
									value: "Diriector_Doc",
									inline: true
								},
								{
									name: "Repository",
									value: "https://github.com/DiriectorDoc/Doc-Bot",
									inline: true
								},
								{
									name: "Age",
									value: "0 years",
									inline: true
								},
								{
									name: "Type",
									value: "Electric/Psychic",
									inline: true
								},
								{
									name: "Ability",
									value: "Download",
									inline: true
								},
								{
									name: "Strength",
									value: "+1",
									inline: true
								},
								{
									name: "Dexterity",
									value: "-2",
									inline: true
								},
								{
									name: "Constitution",
									value: "0",
									inline: true
								},
								{
									name: "Inteligence",
									value: "+10",
									inline: true
								},
								{
									name: "Wisdom",
									value: "+1",
									inline: true
								},
								{
									name: "Charisma",
									value: "+2",
									inline: true
								},
								{
									name: "Favourite food",
									value: "Cookies",
									inline: true
								},
								{
									name: "Hobbies",
									value: "Watching your every move",
									inline: true
								}
							],
							timestamp: new Date()
						}))
						break;
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
									value: "`!about`\n" +
									"`!color`\n" +
									"`!commands`\n" +
									"`!speedruns`\n" +
									"`!yellatme`",
									inline: true
								},
								{
									name: "Purpose",
									value: "Displays information about me, Doc Bot\n" +
									"Changes display name color\n" +
									"Displays this here list\n" +
									"Displays the speedrun.com leaderboards for Brawlhalla\n" +
									"Yells at you",
									inline: true
								}
							],
							timestamp: new Date()
						}))
						break;
					case "color":
					case "colour":
						if(args[0]){
							let arg = args[0].toLowerCase();
							switch(arg){
								case "help":
								case "options":
								case "/?":
								case "colors":
								case "colours":
									msg.reply(new Discord.MessageEmbed({
										title: "Commands",
										color: 0x3498DB,
										author: {
											name: "Doc Bot",
											icon_url: self.displayAvatarURL()
										},
										description: "Changes the " + (arg == "colors" ? "color":"colour") + " of your display name.",
										fields: [
											{
												name: "Availible" + (arg == "colors" ? "Colors":"Colours"),
												value: "`red`\n`orange`\n`yellow`\n`green`\n`blue`\n`cyan`\n`purple`\n`violet` (same as purple)\n`pink`\n`white`"
											}
										],
										timestamp: new Date()
									}))
									break;
								default:
									msg.guild.members.fetch(msg.author.id).then(guildMember => {
										guildMember.roles.set(config.colourIDs[arg] || [])
									})
							}
						}
						break;
					case "speedruns":
						msg.reply(new Discord.MessageEmbed({
							title: "Brawlhalla Speedruns World Records",
							url: "https://www.speedrun.com/brawlhalla",
							color: 0x3498DB,
							author: {
								name: "DocBot",
								icon_url: self.displayAvatarURL()
							},
							description: "Leaderboards from speedrun.com/brawlhalla",
							fields: [
								{
									name: "Tournement",
									value: "1st\t3:25 :flag_de: derkk\n" +
									"2nd\t3:32 :flag_dk: ThStardust\n" +
									"3rd\t3:38 :flag_us: ImLogic\n" +
									"4th\t3:41 :flag_ca: Diriector_Doc",
									inline: true
								},
								{
									name: "Tutorial%",
									value: "1st\t0:49.91 :flag_ca: Zombaxe\n" +
									"2nd\t0:49.96 :flag_us: Captain-No-Beard\n" +
									"3rd\t0:51.63 :flag_ua: Venfurge\n" +
									"4th\t0:52.00 :flag_us: Ratzzz",
									inline: true
								},
								{
									name: "Horde (2p26)",
									value: "1st\t6:57 :flag_us: Ratzzz & Captain-No-Beard\n" +
									"2nd\t7:11 :flag_dk: Haz4ler & ThomsenBoyi\n" +
									"3rd\t7:21 :flag_ca: Zombaxe & Diriector_Doc",
									inline: true
								}
							],
							timestamp: new Date()
						}))
						break;
					case "yellatme":
						modOnly(msg, () => null)
						break;
					case "notify":
						modOnly(msg, () => {
							if(!arg[0]){
								break;
							}
							switch(arg[0]){
								case "update":
									bot.channels.fetch(config.channelIDs.announcements).then(channel => {
										channel.send(
											"Hey, @everyone. It's me, Doc Bot.\n\nOn " + fullDate(new Date(new Date().getTime() + 9e7)) +
											", exactly 25 hours from now, I will be experiencing an update and will not be online. As a result" +
											", a few channels will close to prevent unqueued processes when I go back online.\n" +

											"The #promotion channel will close in 45 minutes from now, preventing anyone from posting " +
											"to the channel. However, it will still remain visable to everyone.\n" +

											"Thank you for your understanding. When I return, I will have more to offer.\n\n" +

											"Bye\n-*Doc Bot*"
										)
									})
									break;
							}
							msg.channel.send("@everyone " + args.join(" "))
						})
						break;
					case "prepareupdateshutdown":
						modOnly(msg, () => {
							msg.channel.send("Preparing shutdown.\nClosing #promotion in 45 minutes.\nLogging off in 25 hours.")
							setTimeout(function(){
								bot.channels.fetch(config.channelIDs.promotion).then(channel => {
									channel.updateOverwrite(channel.guild.roles.everyone, {"SEND_MESSAGES": false})
								})
							}, 27e5)
							setTimeout(function(){
								throw "Doc Bot has been sucessfully stopped."
							}, 9e7)
							let hours = 24,
								countdown = setInterval(function(){
									msg.channel.send("Logging off in " + hours-- + " hours.")
									if(!(hours-1)){
										clearInterval(countdown);
									}
								}, 36e5)
						})
						break;
					case "stop":
						modOnly(msg, () => {
							throw "Doc Bot has been sucessfully stopped."
						})
						break;
					case "close":
					case "open":
						modOnly(msg, () => {
							bot.channels.fetch(config.channelIDs[args[0]]).then(channel => {
								channel.updateOverwrite(channel.guild.roles.everyone, {"SEND_MESSAGES": command == "open"})
							})
						})
						break;
					default:
						msg.reply("What were you thinking? That's not a command.")
				}
			}
	}

})

bot.login(process.env.token) // Set by the VPS