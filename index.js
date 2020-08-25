const Discord = require("discord.js"),
	  bot = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]}),
	  
	  yaml = (link) => require("js-yaml").safeLoad(require("fs").readFileSync(link, "utf8")),
	  
	  leaderboard = yaml("leaderboard.yml"),
	  IDs = yaml("IDs.yml");

let self,
	dmMe;

/* Randomly picks on of and of the given parameters */
function pick(){
	return arguments[Math.round(Math.random()*arguments.length)]
}

/* Turns a date into a neatly formated date and time to be used in a sentence */
function fullDate(date) {
	return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getUTCDay()] +
		`, ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getUTCMonth()]} ` +
		`${date.getUTCDate()}, ${date.getUTCFullYear()}, at ${date.getUTCHours()}:${date.getUTCMinutes()} UTC`
}

/* Checks who entered the command. If it was an admin, it executes the callback. Else, it replies with a randomly generated message. */
function modOnly(msg, call){
	if(IDs.mods.some(id => id === msg.author.id)){
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
				"Use `!commands` to see the availible commands.",
				"I've heard that using `!commands` tells you what you *can* do.",
				"Sorry, but you'll have to make do with some other commands.",
				"There's a huge list of other `!commands`. Use them instead."
			)
		)
	}
}

/* Returns an array of fielsds to bu used in an embeded message. Fields contain the top 3 placings according to leaderboards.yml */
function getTop3(cat){
	let fields = [];
	for(var i = 0; i < 3; i++){
		fields.push({
			name: `${cat[i].place + ([, "st", "nd", "rd"][cat[i].place] || "th")} ${cat[i].time}`,
			value: `:flag_${cat[i].region}:${cat[i].player || cat[i].players.join(", ")}`,
			inline: true
		})
	}
	return fields
}

/* Creates an embed using a sent message as the discription */
function msgCopy(title, msg){
	return new Discord.MessageEmbed({
		title: title,
		color: msg.member.displayHexColor,
		url: msgLink(msg),
		author: {
			name: `${msg.author.username}#${msg.author.discriminator}`,
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

/* Returns the inuted message's link */
function msgLink(msg){
	return `https://discordapp.com/channels/${IDs.server}/${msg.channel.id}/${msg.id}`
}

/* Replies to user with a message saying they used a command incorrectly */
function badCommand(msg, command, text){
	msg.reply(`${text || "You inputted that command incorrectly."} Try again or enter \`!${command}\` for help.`)
}

bot.on("ready", function(){
	console.log("Doc Bot is online")
	bot.users.fetch(IDs.bot, false).then(bot => {
		self = bot
	})
	bot.users.fetch(IDs.mods[0], false).then(user => {
		dmMe = user.send
	})
})

bot.on("message", function(msg){
	if(msg.author.bot)
		return;
	switch(msg.channel.name){
		case "talk-to-the-doc":
			if(msg.author.id != IDs.mods[0]){
				dmMe(msgCopy("Query", msg))
			}
			return;
		case "promotion":
			bot.channels.fetch(IDs.channels.archive).then(channel => {
				channel.send(msgCopy("Archived Promotion", msg))
			})
			console.log(`Preparing to delete ${msg.id}`)
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
				let args = msg.content.toLowerCase().split(" "),
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
                  value: "0.5.1",
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
										description: `Changes the ${arg == "colors" ? "color":"colour"} of your display name.`,
										fields: [
											{
												name: `Availible ${arg == "colors" ? "Colors":"Colours"}`,
												value: "`red`\n`orange`\n`yellow`\n`green`\n`blue`\n`cyan`\n`purple`\n`violet` (same as purple)\n`pink`\n`white`"
											}
										],
										timestamp: new Date()
									}))
									break;
								default:
									msg.guild.members.fetch(msg.author.id).then(guildMember => {
										guildMember.roles.set(IDs.colours[arg] || [])
									})
							}
						} else {
							badCommand(msg, command)
						}
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
									"`!request`\n" +
									"`!speedruns`\n" +
									"`!yellatme`",
									inline: true
								},
								{
									name: "Purpose",
									value: "Displays information about me, Doc Bot\n" +
									"Changes display name color\n" +
									"Displays this here list\n" +
									"Sends a request to D_Doc\n" +
									"Displays Brawlhalla speedrun leaderboatrds\n" +
									"Yells at you",
									inline: true
								}
							],
							timestamp: new Date()
						}))
						break;
					case "request":
						if(args[0]){
							switch(args[0]){
								case "help":
								case "options":
								case "/?":
									msg.reply(new Discord.MessageEmbed({
										title: "Commands",
										color: 0x3498DB,
										author: {
											name: "Doc Bot",
											icon_url: self.displayAvatarURL()
										},
										description: "Sends a request to the admin.",
										fields: [
											{
												name: "Syntax",
												value: "`!request [type] [link]`"
											},
											{
												name: "[type]",
												value: "Possible types:\n`delete`",
												inline: true
											},
											{
												name: "[link]",
												value: "The link of the discord message for which you are making the request",
												inline: true
											}
										],
										timestamp: new Date()
									}))
									break;
								case "censor":
								case "delete":
									let link = /https?\:\/\/discordapp\.com\/channels\/(\d+)\/(\d+)\/(\d+)/g.exec(args[1]);
									if(link){
										bot.channels.fetch(link[2]+"").then(channel => {
											channel.messages.fetch(link[3]+"").then(message => {
												dmMe(
													`A user has requested the ${args[0] == "delete" ? "deletion":"censorship"} of a post.\n---------\n` +
													`Message ID: ${link[3]}\n` +
													`Channel: ${channel.name}\n` +
													`Timestamp: ${new Date(message.createdTimestamp).toString()}\n` +
													`Link: ${link[0]}\n\n` +
													"Please have a look at it"
												)
											})
										})
									} else {
										msg.reply("Could not identify provied link. Please make sure the last parameter is, in fact, the correct link.")
									}
									break;
							}
						} else {
							badCommand(msg, command)
						}
						break;
					case "speedruns":
						if(arg[0]){
							let rule,
								rule2;
							switch(arg[0]){
								case "help":
								case "options":
								case "/?":
								case "boards":
									msg.reply(new Discord.MessageEmbed({
										title: "Commands",
										color: 0x3498DB,
										author: {
											name: "Doc Bot",
											icon_url: self.displayAvatarURL()
										},
										description: "Sends a request to the admin.",
										fields: [
											{
												name: "Syntax",
												value: "`!speedruns [category] [ruleset...[ruleset2]]`"
											},
											{
												name: "[category]",
												value: "Possible categories:\n`tournament`\n`horde`\n`tutorial%`",
												inline: true
											},
											{
												name: "[ruleset]",
												value: "Possible rulesets:\n" +
												"*For Tournament mode*\n`sigs`\n`noSigs` (case sensitive)\n" +
												"*For Horde mode*\n`2p`\n`3p`\n`4p` ",
												inline: true
											},
											{
												name: "[ruleset2]",
												value: "Possible rulesets:\n" +
												"*For Horde mode*\n`wave11`\n`wave21`\n`wave26` ",
												inline: true
											},
											{
												name: "Notes",
												value: "The `tutorial%` category has no ruleset subcategories. Addition parameters proceding the command will have no effect."
											}
										],
										timestamp: new Date()
									}))
									break;
								case "tournament":
									rule = args[1].match(/^(no)?sigs$/g) || args[1] == undefined;
									rule2 = false
									if(rule === true){
										rule = ["sigs"]
									} else {
										badCommand(msg, command)
										break;
									}
								case "horde":
									rule = rule || args[1].match(/^[2-4]p$/g) || args[1] == undefined;
									rule2 = rule2 !== false ? args[2].match(/^wave(11|21|26)$/g) || ["wave26"]:false;
									if(rule === true){
										rule = ["2p"]
									} else {
										badCommand(msg, command)
										break;
									}
									msg.reply(new Discord.MessageEmbed({
										title: "Brawlhalla Speedrun Leaderboard",
										url: "https://www.speedrun.com/brawlhalla",
										color: 0x3498DB,
										author: {
											name: "DocBot",
											icon_url: self.displayAvatarURL()
										},
										description: args[0][0].toUpperCase()+args[0].slice(1)} + 
										` ${
											rule2 ?
											rule[0] + ` ${rule2[0].replace(/e([12])/g, "e $1")}` :
											rule[0] == "sigs" ? "":"No Signatures"
										}` +
										"\n\nLeaderboard from speedrun.com/brawlhalla",
										fields: getTop3(rule2 ? leaderboard[args[0]][rule[0]][rule2[0]]:leaderboard[args[0]][rule[0]]),
										timestamp: new Date()
									}))
									break;
								case "tutorial":
								case "tutorial%":
									msg.reply(new Discord.MessageEmbed({
										title: "Brawlhalla Speedrun Leaderboard",
										url: "https://www.speedrun.com/brawlhalla",
										color: 0x3498DB,
										author: {
											name: "DocBot",
											icon_url: self.displayAvatarURL()
										},
										description: "Tutorual%\n\nLeaderboard from speedrun.com/brawlhalla",
										fields: getTop3(leaderboard[args[0].replace("%", "")]),
										timestamp: new Date()
									}))
							}
						} else {
							badCommand(msg, command, "The syntax for this command has changed.")
						}
						break;
					case "yellatme":
						modOnly(msg, () => null)
						break;
					case "notify":
						if(arg[0]){
							switch(arg[0]){
								case "update":
									modOnly(msg, () => {
                                        bot.channels.fetch(IDs.channels.announcements).then(channel => {
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
									})
									break;
								default:
									msg.channel.send("@everyone " + args.join(" "))
							}
						} else {
							modOnly(msg, () => null)
						}
						break;
					case "prepareupdateshutdown":
						modOnly(msg, () => {
							msg.channel.send("Preparing shutdown.\nClosing #promotion in 45 minutes.\nLogging off in 25 hours.")
							setTimeout(function(){
								bot.channels.fetch(IDs.channels.promotion).then(channel => {
									channel.updateOverwrite(channel.guild.roles.everyone, {"SEND_MESSAGES": false})
								})
							}, 27e5)
							setTimeout(function(){
								throw "Doc Bot has been sucessfully stopped."
							}, 9e7)
							let hours = 24,
								countdown = setInterval(function(){
									msg.channel.send(`Logging off in ${hours--} hours.`)
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
							bot.channels.fetch(IDs.channels[args[0]]).then(channel => {
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

bot.on("messageReactionAdd", async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log("Something went wrong when fetching the message: ", error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	if(reaction.emoji.name == "censor"){
		dmMe(`A user has requested the censorship of a post.
---------
Message ID: ${reaction.message.id}
Channel: ${reaction.message.channel.name}
Timestamp: ${new Date(reaction.message.createdTimestamp).toString()}
Link: ${msgLink(reaction.message)}

Please have a look at it.`)
	}
});

bot.login(process.env.token) // Set by the VPS
