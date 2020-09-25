module.exports = new Promise(resolve => {
	const fetch = require("node-fetch");

	let leaderboard = {tournament:{sigs:[],nosigs:[]},horde:{"2p":{wave11:[],wave21:[],wave26:[]},"3p":{wave11:[],wave21:[],wave26:[]},"4p":{wave11:[],wave21:[],wave26:[]}},tutorial:[]},
		NA = [,,,].fill({player: "<name>", place: 0, time: "N/A", region: "black"}),

		loaded = 0;

	console.group("Fetching leaderboard")
	/*
	 *	You may notice that I did not use any for loops here. I tried that already.
	 *	They do not work properly as fetch() works rather asyncronously.
	 *	The for loop will run its way and all the Promises will use the final
	 *	value instead of each of them individually.
	 */
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdmzez52", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Tournament/Sigs")
			let runs = json.data.runs,
				time0 = runs[0].run.times.primary_t,
				time1 = runs[1].run.times.primary_t,
				time2 = runs[2].run.times.primary_t;
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.sigs[0] = {
					player: player.names.international || "<name>",
					region: (player.location || {country:0}).country.code || "black",
					place: runs[0].place || 0,
					time: `${time0/60|0}:${time0%60}` || "N/A"
				}
				loaded++
			})
			fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.sigs[1] = {
					player: player.names.international || "<name>",
					region: (player.location || {country:0}).country.code || "black",
					place: runs[1].place || 0,
					time: `${time1/60|0}:${time1%60}` || "N/A"
				}
				loaded++
			})
			fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.sigs[2] = {
					player: player.names.international || "<name>",
					region: (player.location || {country:0}).country.code || "black",
					place: runs[2].place || 0,
					time: `${time2/60|0}:${time2%60}` || "N/A"
				}
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Tournament/Sigs")
			leaderboard.tournament.sigs = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdmzez52?var-5lypvpyl=z19ggzjl", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Tournament/NoSigs")
			let runs = json.data.runs,
				time0 = runs[0].run.times.primary_t,
				time1 = runs[1].run.times.primary_t,
				time2 = runs[2].run.times.primary_t;
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.nosigs[0] = {
					player: player.names.international || "<name>",
					region: (player.location || {country:0}).country.code || "black",
					place: runs[0].place || 0,
					time: `${time0/60|0}:${time0%60}` || "N/A"
				}
				loaded++
			})
			fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.nosigs[1] = {
					player: player.names.international || "<name>",
					region: (player.location || {country:0}).country.code || "black",
					place: runs[1].place || 0,
					time: `${time1/60|0}:${time1%60}` || "N/A"
				}
				loaded++
			})
			fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.nosigs[2] = {
					player: player.names.international || "<name>",
					region: (player.location || {country:0}).country.code || "black",
					place: runs[2].place || 0,
					time: `${time2/60|0}:${time2%60}` || "N/A"
				}
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Tournament/NoSigs")
			leaderboard.tournament.nosigs = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/n2yozzzd", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Tutorial%")
			let runs = json.data.runs,
				time0 = runs[0].run.times.primary_t,
				time1 = runs[1].run.times.primary_t,
				time2 = runs[2].run.times.primary_t;
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tutorial[0] = {
					player: player.names.international || "<name>",
					region: (player.location || {country:0}).country.code || "black",
					place: runs[0].place || 0,
					time: `${time0/60|0}:${time0%60}` || "N/A"
				}
				loaded++
			})
			fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tutorial[1] = {
					player: player.names.international || "<name>",
					region: (player.location || {country:0}).country.code || "black",
					place: runs[1].place || 0,
					time: `${time1/60|0}:${time1%60}` || "N/A"
				}
				loaded++
			})
			fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tutorial[2] = {
					player: player.names.international || "<name>",
					region: (player.location || {country:0}).country.code || "black",
					place: runs[2].place || 0,
					time: `${time2/60|0}:${time2%60}` || "N/A"
				}
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Tutorial%")
			leaderboard.tutorial = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdm66m3k", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Horde/2 Players/Wave 11")
			let runs = json.data.runs,
				time0 = runs[0].run.times.primary_t,
				time1 = runs[1].run.times.primary_t,
				time2 = runs[2].run.times.primary_t;
			leaderboard.horde["2p"].wave11[0] = {
				players: [],
				place: runs[0].place || 0,
				time: `${time0/60|0}:${time0%60}` || "N/A"
			}
			leaderboard.horde["2p"].wave11[1] = {
				players: [],
				place: runs[1].place || 0,
				time: `${time1/60|0}:${time1%60}` || "N/A"
			}
			leaderboard.horde["2p"].wave11[2] = {
				players: [],
				place: runs[2].place || 0,
				time: `${time2/60|0}:${time2%60}` || "N/A"
			}
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave11[0].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["2p"].wave11[0].players.push(player.names.international || "<name>")
				loaded++
			})
			if(runs[0].run.players[1]){
				fetch(runs[0].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave11[0].players.push(json.data.names.international || "<name>")
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave11[1].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["2p"].wave11[1].players.push(player.names.international || "<name>")
				loaded++
			})
			if(runs[1].run.players[1]){
				fetch(runs[1].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave11[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave11[2].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["2p"].wave11[2].players.push(player.names.international || "<name>")
				loaded++
			})
			if(runs[2].run.players[2]){
				fetch(runs[2].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave11[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
			} else {
				loaded++
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/2 Players/Wave 11")
			leaderboard.tournament.nosigs = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdm66m3k?var-9l779p9l=jq6k3ynl", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Horde/2 Players/Wave 21")
			let runs = json.data.runs,
				time0 = runs[0].run.times.primary_t,
				time1 = runs[1].run.times.primary_t,
				time2 = runs[2].run.times.primary_t;
			leaderboard.horde["2p"].wave21[0] = {
				players: [],
				place: runs[0].place || 0,
				time: `${time0/60|0}:${time0%60}` || "N/A"
			}
			leaderboard.horde["2p"].wave21[1] = {
				players: [],
				place: runs[1].place || 0,
				time: `${time1/60|0}:${time1%60}` || "N/A"
			}
			leaderboard.horde["2p"].wave21[2] = {
				players: [],
				place: runs[2].place || 0,
				time: `${time2/60|0}:${time2%60}` || "N/A"
			}
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave21[0].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["2p"].wave21[0].players.push(player.names.international || "<name>")
				loaded++
			})
			if(runs[0].run.players[1]){
				fetch(runs[0].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave21[0].players.push(json.data.names.international || "<name>")
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave21[1].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["2p"].wave21[1].players.push(player.names.international || "<name>")
				loaded++
			})
			if(runs[1].run.players[1]){
				fetch(runs[1].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave21[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave21[2].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["2p"].wave21[2].players.push(player.names.international || "<name>")
				loaded++
			})
			if(runs[2].run.players[2]){
				fetch(runs[2].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave21[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
			} else {
				loaded++
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/2 Players/Wave 21")
			leaderboard.tournament.nosigs = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdm66m3k?var-9l779p9l=5lmjz8yl", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Horde/2 Players/Wave 26")
			let runs = json.data.runs,
				time0 = runs[0].run.times.primary_t,
				time1 = runs[1].run.times.primary_t,
				time2 = runs[2].run.times.primary_t;
			leaderboard.horde["2p"].wave26[0] = {
				players: [],
				place: runs[0].place || 0,
				time: `${time0/60|0}:${time0%60}` || "N/A"
			}
			leaderboard.horde["2p"].wave26[1] = {
				players: [],
				place: runs[1].place || 0,
				time: `${time1/60|0}:${time1%60}` || "N/A"
			}
			leaderboard.horde["2p"].wave26[2] = {
				players: [],
				place: runs[2].place || 0,
				time: `${time2/60|0}:${time2%60}` || "N/A"
			}
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave26[0].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["2p"].wave26[0].players.push(player.names.international || "<name>")
				loaded++
			})
			if(runs[0].run.players[1]){
				fetch(runs[0].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave26[0].players.push(json.data.names.international || "<name>")
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave26[1].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["2p"].wave26[1].players.push(player.names.international || "<name>")
				loaded++
			})
			if(runs[1].run.players[1]){
				fetch(runs[1].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave26[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave26[2].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["2p"].wave26[2].players.push(player.names.international || "<name>")
				loaded++
			})
			if(runs[2].run.players[2]){
				fetch(runs[2].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave26[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
			} else {
				loaded++
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/2 Players/Wave 26")
			leaderboard.tournament.nosigs = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdm66m3k?var-ylpegpj8=jq6k34nl", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Horde/3 Players/Wave 11")
			let runs = json.data.runs,
				time0 = runs[0].run.times.primary_t,
				time1 = runs[1].run.times.primary_t,
				time2 = runs[2].run.times.primary_t;
			leaderboard.horde["3p"].wave11[0] = {
				players: [],
				place: runs[0].place || 0,
				time: `${time0/60|0}:${time0%60}` || "N/A"
			}
			leaderboard.horde["3p"].wave11[1] = {
				players: [],
				place: runs[1].place || 0,
				time: `${time1/60|0}:${time1%60}` || "N/A"
			}
			leaderboard.horde["3p"].wave11[2] = {
				players: [],
				place: runs[2].place || 0,
				time: `${time2/60|0}:${time2%60}` || "N/A"
			}
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave11[0].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["3p"].wave11[0].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave11[1].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["3p"].wave11[1].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[1].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[1].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[1].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[1].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave11[2].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["3p"].wave11[2].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[2].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[2].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[2].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[2].players.push(json.data.names.international || "<name>")
				loaded++
			})
			.catch(err => {
				leaderboard.horde["3p"].wave21[2].players.push(runs[2].run.players[2].name)
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/3 Players/Wave 11")
			leaderboard.tournament.nosigs = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdm66m3k?var-ylpegpj8=jq6k34nl&var-9l779p9l=jq6k3ynl", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Horde/3 Players/Wave 21")
			let runs = json.data.runs,
				time0 = runs[0].run.times.primary_t,
				time1 = runs[1].run.times.primary_t,
				time2 = runs[2].run.times.primary_t;
			leaderboard.horde["3p"].wave21[0] = {
				players: [],
				place: runs[0].place || 0,
				time: `${time0/60|0}:${time0%60}` || "N/A"
			}
			leaderboard.horde["3p"].wave21[1] = {
				players: [],
				place: runs[1].place || 0,
				time: `${time1/60|0}:${time1%60}` || "N/A"
			}
			leaderboard.horde["3p"].wave21[2] = {
				players: [],
				place: runs[2].place || 0,
				time: `${time2/60|0}:${time2%60}` || "N/A"
			}
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave21[0].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["3p"].wave21[0].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave21[1].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["3p"].wave21[1].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[1].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[1].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[1].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[1].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave21[2].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["3p"].wave21[2].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[2].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[2].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[2].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[2].players.push(json.data.names.international || "<name>")
				loaded++
			})
			.catch(err => {
				leaderboard.horde["3p"].wave21[2].players.push(runs[2].run.players[2].name)
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/3 Players/Wave 21")
			leaderboard.tournament.nosigs = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdm66m3k?var-ylpegpj8=jq6k34nl&var-9l779p9l=5lmjz8yl", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Horde/3 Players/Wave 26")
			let runs = json.data.runs,
				run1 = runs[0],
				run2 = runs[1],
				run3 = runs[2],
				time0 = runs[0].run.times.primary_t,
				time1 = run2 ? runs[1].run.times.primary_t:0,
				time2 = run3 ? runs[2].run.times.primary_t:0;
			leaderboard.horde["3p"].wave26[0] = {
				players: [],
				place: runs[0].place || 0,
				time: `${time0/60|0}:${time0%60}` || "N/A"
			}
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave26[0].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["3p"].wave26[0].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave26[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave26[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			if(run2){
				leaderboard.horde["3p"].wave26[1] = {
					players: [],
					place: runs[1].place || 0,
					time: `${time1/60|0}:${time1%60}` || "N/A"
				}
				fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["3p"].wave26[1].region = (player.location || {country:0}).country.code || "black";
					leaderboard.horde["3p"].wave26[1].players.push(player.names.international || "<name>")
					loaded++
				})
				fetch(runs[1].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["3p"].wave26[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[1].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["3p"].wave26[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
			}
			if(run3){
				leaderboard.horde["3p"].wave26[2] = {
					players: [],
					place: runs[2].place || 0,
					time: `${time2/60|0}:${time2%60}` || "N/A"
				}
				fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["3p"].wave26[2].region = (player.location || {country:0}).country.code || "black";
					leaderboard.horde["3p"].wave26[2].players.push(player.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["3p"].wave26[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["3p"].wave26[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/3 Players/Wave 26")
			leaderboard.tournament.nosigs = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdm66m3k?var-ylpegpj8=5lmjzxyl", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Horde/3 Players/Wave 11")
			let runs = json.data.runs,
				run1 = runs[0],
				run2 = runs[1],
				run3 = runs[2],
				time0 = runs[0].run.times.primary_t,
				time1 = runs[1].run.times.primary_t,
				time2 = run3 ? runs[2].run.times.primary_t:0;
			leaderboard.horde["4p"].wave11[0] = {
				players: [],
				place: runs[0].place || 0,
				time: `${time0/60|0}:${time0%60}` || "N/A"
			}
			leaderboard.horde["4p"].wave11[1] = {
				players: [],
				place: runs[1].place || 0,
				time: `${time1/60|0}:${time1%60}` || "N/A"
			}
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["4p"].wave11[0].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["4p"].wave11[0].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[3].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["4p"].wave11[1].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["4p"].wave11[1].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[1].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[1].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[1].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[1].players.push(json.data.names.international || "<name>")
				loaded++
			})
			.catch(err => {
				leaderboard.horde["4p"].wave11[1].players.push(runs[1].run.players[2].name)
				loaded++
			})
			fetch(runs[1].run.players[3].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[1].players.push(json.data.names.international || "<name>")
				loaded++
			})
			.catch(err => {
				leaderboard.horde["4p"].wave11[1].players.push(runs[1].run.players[3].name)
				loaded++
			})
			if(run3){
				leaderboard.horde["4p"].wave11[2] = {
					players: [],
					place: runs[2].place || 0,
					time: `${time2/60|0}:${time2%60}` || "N/A"
				}
				fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave11[2].region = (player.location || {country:0}).country.code || "black";
					leaderboard.horde["4p"].wave11[2].players.push(player.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave11[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave11[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[3].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave11[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave11[2].players.push(runs[2].run.players[3].name)
					loaded++
				})
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/4 Players/Wave 11")
			leaderboard.tournament.nosigs = NA
		})
	fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdm66m3k?var-ylpegpj8=5lmjzxyl&var-9l779p9l=jq6k3ynl", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Horde/3 Players/Wave 21")
			let runs = json.data.runs,
				run1 = runs[0],
				run2 = runs[1],
				run3 = runs[2],
				time0 = runs[0].run.times.primary_t,
				time1 = run2 ? run2.run.times.primary_t:0,
				time2 = run3 ? run3.run.times.primary_t:0;
			leaderboard.horde["4p"].wave21[0] = {
				players: [],
				place: runs[0].place || 0,
				time: `${time0/60|0}:${time0%60}` || "N/A"
			}
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["4p"].wave21[0].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["4p"].wave21[0].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave21[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave21[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[3].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave21[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			if(run2){
				leaderboard.horde["4p"].wave21[1] = {
					players: [],
					place: runs[1].place || 0,
					time: `${time1/60|0}:${time1%60}` || "N/A"
				}
				fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave21[1].region = (player.location || {country:0}).country.code || "black";
					leaderboard.horde["4p"].wave21[1].players.push(player.names.international || "<name>")
					loaded++
				})
				fetch(runs[1].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[1].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave21[1].players.push(runs[1].run.players[2].name)
					loaded++
				})
				fetch(runs[1].run.players[3].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave21[1].players.push(runs[1].run.players[3].name)
					loaded++
				})
			}
			if(run3){
				leaderboard.horde["4p"].wave21[2] = {
					players: [],
					place: runs[2].place || 0,
					time: `${time2/60|0}:${time2%60}` || "N/A"
				}
				fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave21[2].region = (player.location || {country:0}).country.code || "black";
					leaderboard.horde["4p"].wave21[2].players.push(player.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[3].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave21[2].players.push(runs[2].run.players[3].name)
					loaded++
				})
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/4 Players/Wave 21")
			leaderboard.tournament.nosigs = NA
		})
	/*fetch("https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/wdm66m3k?var-ylpegpj8=5lmjzxyl&var-9l779p9l=5lmjz8yl", {method: "Get"})
		.then(res => res.json())
		.then(json => {
			console.info("Horde/3 Players/Wave 26")
			let runs = json.data.runs,
				run1 = runs[0],
				run2 = runs[1],
				run3 = runs[2],
				time0 = runs[0].run.times.primary_t,
				time1 = run2 ? run2.run.times.primary_t:0,
				time2 = run3 ? run3.run.times.primary_t:0;
			leaderboard.horde["4p"].wave26[0] = {
				players: [],
				place: runs[0].place || 0,
				time: `${time0/60|0}:${time0%60}` || "N/A"
			}
			fetch(runs[0].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["4p"].wave26[0].region = (player.location || {country:0}).country.code || "black";
				leaderboard.horde["4p"].wave26[0].players.push(player.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave26[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave26[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			fetch(runs[0].run.players[3].uri, {method: "Get"}).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave26[0].players.push(json.data.names.international || "<name>")
				loaded++
			})
			if(run2){
				leaderboard.horde["4p"].wave26[1] = {
					players: [],
					place: runs[1].place || 0,
					time: `${time1/60|0}:${time1%60}` || "N/A"
				}
				fetch(runs[1].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave26[1].region = (player.location || {country:0}).country.code || "black";
					leaderboard.horde["4p"].wave26[1].players.push(player.names.international || "<name>")
					loaded++
				})
				fetch(runs[1].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[1].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave26[1].players.push(runs[1].run.players[2].name)
					loaded++
				})
				fetch(runs[1].run.players[3].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[1].players.push(json.data.names.international || "<name>")
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave26[1].players.push(runs[1].run.players[3].name)
					loaded++
				})
			}
			if(run3){
				leaderboard.horde["4p"].wave26[2] = {
					players: [],
					place: runs[2].place || 0,
					time: `${time2/60|0}:${time2%60}` || "N/A"
				}
				fetch(runs[2].run.players[0].uri, {method: "Get"}).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave26[2].region = (player.location || {country:0}).country.code || "black";
					leaderboard.horde["4p"].wave26[2].players.push(player.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[1].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[2].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				fetch(runs[2].run.players[3].uri, {method: "Get"}).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[2].players.push(json.data.names.international || "<name>")
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave26[2].players.push(runs[2].run.players[3].name)
					loaded++
				})
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/4 Players/Wave 26")
			leaderboard.tournament.nosigs = NA
		})*/
	let a = setInterval(function(){
		if(loaded == 60){
			console.groupEnd()
			clearInterval(a)
			clearInterval(b)
			resolve(leaderboard)
		}
	}, 100),
		b = setInterval(function(){
			console.groupEnd()
			clearInterval(a)
			clearInterval(b)
			module.exports = resolve(leaderboard)
		}, 15000)
})