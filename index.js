/* eslint-env es6 */
/* eslint-disable no-console */
console.info("Caching packages")

const Discord = require("discord.js"),
	  fetch = require("node-fetch"),

	  DataImageAttachment = require("dataimageattachment"),

	  bot = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]}),

	  yaml = (link) => require("js-yaml").load(require("fs").readFileSync(link, "utf8")),

	  IDs = yaml("IDs.yml"),
	  quotes = yaml("quotes.yml");

let self,
	dmMe,

	leaderboard;

/* Randomly picks one of and of the given parameters */
function pick(){
	return arguments[Math.random()*arguments.length|0]
}

/* Turns a date into a neatly formated date and time to be used in a sentence */
function fullDate(date) {
	return `${
	["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getUTCDay()]}, ${
	["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getUTCMonth()]} ${
	date.getUTCDate()}, ${date.getUTCFullYear()}, at ${date.getUTCHours()}:${date.getUTCMinutes()} UTC`
}

/* Checks who entered the command. If it was an admin, it executes the callback. Else, it replies with a randomly generated message. */
function modOnly(msg, call){
	if(IDs.mods.some(id => id === msg.author.id)){
		call()
	} else {
		msg.reply(`${
			pick(
				"Excuse me?",
				"Ah, ah, ah.",
				"What are you doing?",
				"Stop right there!",
				"Um...",
				"Um, no.",
				"Hold it!",
				"I don't think so."
			)} ${
			pick(
				"Are you an admin? No? I didn't think so.",
				"You need to be an admin to use that command.",
				"Only admins can do that.",
				"You tried, but that's an admin-only command.",
				"Last time I checked, you aren't an admin."
			)} ${
			pick(
				"Lay of the admin commands, m'kay?",
				"Try a different command, you might have some luck.",
				"Use `!commands` to see the availible commands.",
				"I've heard that using `!commands` tells you what you *can* do.",
				"Sorry, but you'll have to make do with some other commands.",
				"There's a huge list of other `!commands`. Use them instead."
			)
		}`)
	}
}

/* Returns an array of fielsds to bu used in an embeded message. Fields contain the top 3 placings according to leaderboards.yml */
function getTop3(cat){
	let fields = [];
	for(var i = 0; i < 3 && cat[i]; i++){
		fields.push({
			name: `${cat[i].place}${[, "ˢᵗ", "ⁿᵈ", "ʳᵈ"][cat[i].place] ?? "ᵗʰ"} __${cat[i].time}__`,
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
	msg.reply(`${text ?? "You inputted that command incorrectly."} Try again or enter \`!${command} /?\` for help.`)
}

/* Sends a deprication warning */
function depricated(msg){
	modOnly(msg, () => {
		msg.reply("That command has been depricated. You should know, you're the one who depricated it.")
	})
}

bot.on("ready", function(){
	console.log("Doc Bot is online")
	bot.users.fetch(IDs.bot, false).then(bot => {
		self = bot
	})
	bot.users.fetch(IDs.mods[0], false).then(user => {
		dmMe = function(message){
			user.send(message)
		}
	})
	bot.channels.fetch(IDs.channels.promotion).then(channel => {
		channel.messages.fetch().then(async messages => {
			for(let msg of messages.array()){
				msg.delete({
					timeout: 864e5 - Date.now() + msg.createdTimestamp,
					reason: "Automatic. Promotions are deleted after 24 hours."
				})
			}
		})
	})
	let access,
		expiration = 0,
		liveChecker,
		fetchStream = async function(){
			if(Date.now() > expiration){
				await fetch(`https://id.twitch.tv/oauth2/token?client_id=bo8uxlgi4spxhtss7xwt8slszlcm38&client_secret=${process.env.client_secret ?? process.argv[3]}&grant_type=client_credentials`, {
						method: "POST"
					})
					.then(res => res.json())
					.then(json => {
						access = json.access_token;
						expiration = json.expires_in + Date.now()
					})
					.catch(err => console.error(err))
			}
			await fetch("https://api.twitch.tv/helix/streams?user_id=40464688", {
					headers: {
						'Client-ID': 'bo8uxlgi4spxhtss7xwt8slszlcm38',
						"Authorization": "Bearer " + access
					}
				})
				.then(res => res.json())
				.then(json => {
					let stream = json.data[0];
					if(stream){
						bot.channels.fetch(IDs.channels["stream-notifs"]).then(channel => {
							channel.send(`<@&${IDs.roles.notifs}>\nDiriector_Doc just went live ${(Date.now()-new Date(stream.started_at))/6e4|0} minutes ago. He's playing some ${stream.game_name}. Come watch and chat with him!`, {
								embed: new Discord.MessageEmbed({
									title: stream.title,
									color: 0x9147FF,
									author: {
										name: "Doc Bot",
										icon_url: self.displayAvatarURL()
									},
									url: "https://twitch.tv/diriector_doc",
									thumbnail: {
										url: "attachment://logo_twitch.png"
									},
									description: "Current viewers: " + stream.viewer_count,
									image: {
										url: stream.thumbnail_url.replace("{width}", 400).replace("{height}", 225)
									},
									timestamp: new Date
								}),
								files: [new DataImageAttachment("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAAANlBMVEUAAACQSP+RR/+QRf+SR/+RR/+PRP+QSP+RRf+SR/+SSP+SSf+RR/+PRP+SRv+SR/+SSP+RR/9zlT3GAAAAEXRSTlMAxO0wReEpVQvcbhvJIrCUegBSdLsAAAE1SURBVGje7dbLbsMwDERRPexaid0k+v+f7SbGoHUECqRHgFHe5WwOIG0Y9qZKKgb0wExDClYecsfKQzasNCRj5CFPjDSkpEorfvr2dFIHJFaUwyl9AcFAR54DkJIGIEsdgDwGIGsdgLxGINERRxy5FLLd3v2eyz7HM5BU3/1B9nl2xBFHHHHEEUccceQ6SN5r7Ze5hf8tkgcg642IwOAhMHgIDCICA90ViMaQEbshI3ZDRuyGjNgNGbEbMmI3ZMRuyIjdaCOv5dgaUFkaNQwgQlOAsVUhGApEYSgQhaFAug0dojAUiMJQIApDgfQaekRhKJBew4L0GhZk6TRMSOozbIjaAMIzUJ4+13yjeTqWg665ZXwHc0CIBhCiAYRoACEaQIgGEKIBhGgAIRpAiAYQvgHEbvwAeWsLTVU1onwAAAAASUVORK5CYII=", "logo_twitch.png")]
							})
						})
						clearInterval(liveChecker)
						console.info("Live checker deactivated")
					} else {
						console.info(`No stream live at ${new Date}. Checker still active.`)
					}
				})
				.catch(err => {
					console.error(err)
					clearInterval(liveChecker)
					console.info("Live checker deactivated")
				})
		};

	;(async function(){
		liveChecker = setInterval(fetchStream, 18e5)
		console.info("Live checker active")
		await fetchStream()
		leaderboard = await require("./leaderboard")
	})()
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
								url: self.displayAvatarURL()
							},
							description: "Doc Bot's info and stats",
							fields: [
								{
									name: "Version",
									value: "0.9.1",
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
									name: "Birthday",
									value: `August 19, 2020\n(${(Date.now()-15978096e5)/(315576e5)|0} year${!((Date.now()-15978096e5)/(315576e5)|0)?"s":""} ago)`,
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
					case "bug":
						msg.reply(
							"To report a bug, please visit https://github.com/DiriectorDoc/Doc-Bot/issues/new?assignees=&labels=bug&template=bug_report.md&title=" +
							"\n\nOr let me know in #talk-to-the-doc"
						)
						break;
					case "color":
					case "colour":
						if(args[0]){
							let argument = args[0].toLowerCase();
							switch(argument){
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
										description: `Changes the ${command} of your display name.`,
										fields: [
											{
												name: `Availible ${command}s`,
												value: "`red`\n`orange`\n`yellow`\n`green`\n`blue`\n`cyan`\n`purple`\n`violet` (same as purple)\n`pink`\n`white`"
											}
										],
										timestamp: new Date()
									}))
									break;
								default:
									msg.guild.members.fetch(msg.author.id).then(guildMember => {
										let notif = guildMember.roles.cache.has(IDs.roles.notifs);
										guildMember.roles.set(IDs.colours[argument] ?? [])
										if(notif){
											guildMember.roles.add(IDs.roles.notifs)
										}
									})
									msg.reply(`Your display ${command} has been set.`)
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
									name: "`!about`",
									value: "Displays information about me, Doc Bot"
								},
								{
									name: "`!bug`",
									value: "Replies with a link for submitting a bug"
								},
								{
									name: "`!color`",
									value: "Changes display name color"
								},
								{
									name: "`!commands`",
									value: "Displays this here list"
								},
								{
									name: "`!request`",
									value: "Sends a request to D_Doc"
								},
								{
									name: "`!speedruns`",
									value: "Displays Brawlhalla speedrun leaderboards"
								},
								{
									name: "`!yellatme`",
									value: "Displays the 'admin only command' message"
								},
								{
									name: "`!wisdom`",
									value: "Displayes a random quote"
								}
							],
							timestamp: new Date()
						}))
						break;
					case "notify":
						msg.guild.members.fetch(msg.author.id).then(guildMember => {
							if(guildMember.roles.cache.has(IDs.roles.notifs)){
								guildMember.roles.remove(IDs.roles.notifs)
								msg.reply("You will no longer get stream notifications.")
							} else {
								guildMember.roles.add(IDs.roles.notifs)
								msg.reply("You will now get stream notifications.")
							}
						})
						break;
					case "penis":
						msg.reply(`your penis is this long:\n8${Array(9).fill("=",0,msg.author.id.match(/\d{4}$/)%9+1).join("")}D`)
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
												value: "`!request [type] [arguments]`"
											},
											{
												name: "[type]",
												value: "Possible types:\n`delete`\n`censor` (same a `delete`)\n`wisdom`"
											},
											{
												name: "`delete` or `censor`",
												value: "Use this command followed by a link to request the removal of a message.",
												inline: true
											},
											{
												name: "Example",
												value: "`!request delete https://discordapp.com/channels/123/456/789`",
												inline: true
											},
											{
												name: '\u200B',
												value: '\u200B',
												inline: true
											},
											{
												name: "`wisdom`",
												value: "Request a quote be added to the `!wisdom` command.",
												inline: true
											},
											{
												name: "Example",
												value: '`!request wisdom "I like food" - dave, 2020`',
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
													`Timestamp: ${new Date(message.createdTimestamp).toString().replace(/GMT\+0000/g, "UTC±00:00")}\n` +
													`Link: ${link[0]}\n\n` +
													"Please have a look at it"
												)
											})
										})
									} else {
										msg.reply("Could not identify provied link. Please make sure the last parameter is, in fact, the correct link.")
									}
									break;
								case "wisdom":
									dmMe(
										"A user has requested wisdom be added to the `!wisdom` command:\n" +
										`Quote: ${msg.content.replace(/!request\s+wisdom\s+/g, "")}\n` +
										`Timestamp: ${new Date(msg.createdTimestamp).toString().replace(/GMT\+0000/g, "UTC±00:00")}\n` +
										`Link: ${msgLink(msg)}\n\n` +
										"Please have a look at it"
									)
							}
						} else {
							badCommand(msg, command)
						}
						break;
					case "speedrun":
					case "speedruns":
						if(args[0]){
							let rule,
								rule2;
							switch(args[0]){
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
												value: "Possible categories:\n`tournament`\n`tutorial%`\n`horde`\n`walker`",
												inline: true
											},
											{
												name: "[ruleset]",
												value: "Possible rulesets:\n" +
												"*For Tournament mode*\n`sigs`\n`noSigs`\n" +
												"\n*For Horde mode*\n`2p`\n`3p`\n`4p`\n`1p1b`" +
												"\n*For Walker mode*\n`2p`\n`1p1b`",
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
												value: "The `tutorial%` category has no ruleset subcategories. Additional parameters proceding the command will be ignored."
											}
										],
										timestamp: new Date()
									}))
									break;
								case "tournament":
									if(args[1]){
										try {
											rule = args[1].match(/^(no)?sigs$/g)[0]
										} catch(err){
											badCommand(msg, command)
											break
										}
									} else {
										rule = "sigs"
									}
								case "walker":
									if(args[1] && !rule){
										try {
											rule = args[1].match(/^2p|1p1b$/g)[0]
										} catch(err){
											badCommand(msg, command)
											break
										}
										rule2 = "wave6";
									} else if(rule === undefined){
										rule = "2p"
										rule2 = "wave6";
									}
								case "horde":
									if(args[1] && !rule){
										try {
											rule = args[1].match(/^[2-4]p|1p1b$/g)[0]
										} catch(err){
											badCommand(msg, command)
											break
										}
										if(args[2] && !rule2){
											try {
												rule2 = args[2].match(/^wave(11|21|26)$/g)[0]
											} catch(err){
												badCommand(msg, command)
												break
											}
										} else {
											rule2 = "wave11"
										}
									} else if(rule === undefined){
										rule = "2p";
										rule2 = "wave11"
									}
									let scores = rule2 ? leaderboard[args[0]][rule][rule2] : leaderboard[args[0]][rule];
									if(scores[0]){
										msg.reply(new Discord.MessageEmbed({
											title: "Brawlhalla Speedrun Leaderboard",
											url: "https://www.speedrun.com/brawlhalla",
											color: 0x3498DB,
											author: {
												name: "DocBot",
												icon_url: self.displayAvatarURL()
											},
											description: `${args[0][0].toUpperCase()+args[0].slice(1)} ${
												rule2 ?
												rule + ` ${rule2.replace(/wave([12])/g, "Wave $1")}` :
												rule == "sigs" ? "":"No Signatures"
											}\n\nLeaderboard from speedrun.com/brawlhalla`,
											fields: getTop3(scores),
											timestamp: new Date()
										}))
									} else {
										msg.reply("There is currently no data for that leaderboard")
									}
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
					case "wisdom":
						msg.reply((ob => `\n> ${ob.text}\n\u2003\u2014 ${ob.by.replace("\n", "")}`)(pick(...quotes)))
						break;
					case "yellatme":
						modOnly(msg, () => null)
						break;
					case "stop":
						modOnly(msg, () => {
							throw "Doc Bot has been sucessfully stopped."
						})
						break;
					case "close":
					case "open":
						modOnly(msg, () => {
							let state = command == "open";
							bot.channels.fetch(IDs.channels[args[0]]).then(channel => {
								channel.updateOverwrite(channel.guild.roles.everyone, {"SEND_MESSAGES": state && args[1] == "--force" ? state : state || null})
							})
						})
						break;
					case "poll":
						modOnly(msg, () => {
							let parts = msg.content.replace(/\s*\|\s*/g, "|").split("|");
							if(parts[2] && parts[2].match(/^:.+:$/g)){
								let options;
								for(var i = 1; i < parts.length; i += 2){
									if(parts[i] && parts[i+1]){
										options += `\n${parts[i+1]} \u2014 ${parts[i]}`
									}
								}
								bot.channels.fetch(IDs.channels.announcements).then(channel => {
									channel.send(`@everyone\n\n${parts[0] + options}`).then(message => {
										for(var i = 2; i < parts.length; i += 2){
											message.react(message.guild.emojis.cache.find(emoji => emoji.name === /:(.+):/g.exec(parts[i])[1]))
										}
									})
								})
							}
						})
						break;
					default:
						msg.reply(
							`${pick(
							"What were you thinking?",
							"Whoops.",
							"Try again.",
							"Sorry."
							)} That's not a command.`
						)
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
Timestamp: ${new Date(reaction.message.createdTimestamp).toString().replace(/GMT\+0000/g, "UTC±00:00")}
Link: ${msgLink(reaction.message)}

Please have a look at it.`)
	}
})

bot.login(process.env.token ?? process.argv[2]) // Set by the VPS (process.env.token)