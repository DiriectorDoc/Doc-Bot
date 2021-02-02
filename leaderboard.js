module.exports = new Promise(resolve => {
	const fetch = require("node-fetch");

	let leaderboard = {
			tournament: {
				sigs: [],
				nosigs: []
			},
			horde: {
				"2p": {
					wave11: [],
					wave21: [],
					wave26: []
				},
				"3p": {
					wave11: [],
					wave21: [],
					wave26: []
				},
				"4p": {
					wave11: [],
					wave21: [],
					wave26: []
				},
				"1p1b": {
					wave11: [],
					wave21: [],
					wave26: []
				}
			},
			walker: {
				"2p": {
					wave6: []
				},
				"1p1b": {
					wave6: []
				},
				"1p": {
					wave6: []
				}
			},
			tutorial: []
		},
		NA = [,,,].fill({player: "<name>", place: 0, time: "N/A", region: "black"}),

		name = p => (p.names || 0).international || "<name>",
		region = p => (p.location || {country:0}).country.code || "black",
		place = r => r.place || 0,

		get = {method: "Get"},
		url = "https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/",
		categories = [
			["wdmzez52?var-5lypvpyl=814eexwl", "Tournament/Sigs", "sigs"],
			["wdmzez52?var-5lypvpyl=z19ggzjl", "Tournament/NoSigs", "nosigs"],
			["02qvnl7d?var-kn0jo43l=5q88rxgq", "Walker Attack/1 Player 1 Bot/Wave 6", "1p1b", "wave6", "walker"],
			["02qvnl7d?var-kn0jo43l=z19mm68l", "Walker Attack/1 Player/Wave 6", "1p", "wave6", "walker"],
			["wdm66m3k?var-ylpegpj8=gq7dg0pq&var-9l779p9l=810e30jq", "Horde/1 Player 1 Bot/Wave 11", "1p1b", "wave11", "horde"],
			["wdm66m3k?var-ylpegpj8=9qjyjz0q&var-9l779p9l=810e30jq", "Horde/2 Players/Wave 11", "2p", "wave11"],
			["wdm66m3k?var-ylpegpj8=9qjyjz0q&var-9l779p9l=jq6k3ynl", "Horde/2 Players/Wave 21", "2p", "wave21"],
			["wdm66m3k?var-ylpegpj8=9qjyjz0q&var-9l779p9l=5lmjz8yl", "Horde/2 Players/Wave 26", "2p", "wave26"],
			["wdm66m3k?var-ylpegpj8=jq6k34nl&var-9l779p9l=810e30jq", "Horde/3 Players/Wave 11", "3p", "wave11"],
			["wdm66m3k?var-ylpegpj8=jq6k34nl&var-9l779p9l=jq6k3ynl", "Horde/3 Players/Wave 21", "3p", "wave21"],
			["wdm66m3k?var-ylpegpj8=jq6k34nl&var-9l779p9l=5lmjz8yl", "Horde/3 Players/Wave 26", "3p", "wave26"],
			["wdm66m3k?var-ylpegpj8=5lmjzxyl&var-9l779p9l=810e30jq", "Horde/4 Players/Wave 11", "4p", "wave11"],
			["wdm66m3k?var-ylpegpj8=5lmjzxyl&var-9l779p9l=jq6k3ynl", "Horde/4 Players/Wave 21", "4p", "wave21"],
			["02qvnl7d?var-kn0jo43l=jqzeyrgq", "Walker Attack/2 Players/Wave 6"]
		];

	Object.prototype.uri = function(a){return this.run.players[a].uri};
	Object.prototype.time = function(){let t = this.run.times.primary_t;return t ? `${t/60|0}:${(t%60>9?"":"0")+t%60}` : "N/A"};

	console.group("Fetching leaderboard")

	;(async function(){
		for(let k = 0; k < 14; k++){
			if(k < 2){
				await fetch(url+categories[k][0], get)
					.then(res => res.json())
					.then(async json => {
						console.info(categories[k][1])
						let runs = json.data.runs;
						for(let i = 0; i < 3; i++){
							await fetch(runs[i].uri(0), get).then(res => res.json()).then(json => {
								let player = json.data
								leaderboard.tournament[categories[k][2]][i] = {
									player: name(player),
									region: region(player),
									place: place(runs[i]),
									time: runs[i].time()
								}
							})
						}
					})
					.catch(err => {
						console.error(err)
						console.warn(`Could not fetch ${categories[k][1]}`)
						leaderboard.tournament[categories[k][2]] = NA
					})
			} else if(k < 5){
				await fetch(url+categories[k][0], get)
					.then(res => res.json())
					.then(async json => {
						console.info(categories[k][1])
						let runs = json.data.runs;
						for(let i = 0; i < 3; i++){
							await fetch(runs[i].uri(0), get).then(res => res.json()).then(json => {
								let player = json.data
								leaderboard[categories[k][4]][categories[k][2]][categories[k][3]][i] = {
									player: name(player),
									region: region(player),
									place: place(runs[i]),
									time: runs[i].time()
								}
							})
						}
					})
					.catch(err => {
						console.error(err)
						console.warn(`Could not fetch ${categories[k][1]}`)
						leaderboard[categories[k][4]][categories[k][2]][categories[k][3]] = NA
					})
			} else if(k < 13){
				await fetch(url+categories[k][0], get)
					.then(res => res.json())
					.then(async json => {
						console.info(categories[k][1])
						let runs = json.data.runs;
						for(let i = 0; i < 3; i++){
							if(runs[i]){
								leaderboard.horde[categories[k][2]][categories[k][3]][i] = {
									players: [],
									place: place(runs[i]),
									time: runs[i].time()
								}
								let offset = 0;
								for(let j = 0; j < +categories[k][2][0]+offset; j++){
									if(runs[i+offset].run.players.length == 1){
										offset++
										continue
									}
									await fetch(runs[i+offset].uri(j-offset), get).then(res => res.json()).then(json => {
										if(!leaderboard.horde[categories[k][2]][categories[k][3]][i].region){
											leaderboard.horde[categories[k][2]][categories[k][3]][i].region = region(json.data)
										}
										leaderboard.horde[categories[k][2]][categories[k][3]][i].players.push(name(json.data))
									}).catch(err => {
										leaderboard.horde[categories[k][2]][categories[k][3]][i].players.push(runs[i+offset].run.players[j-offset].name)
									})
								}
							}
						}
					})
					.catch(err => {
						console.error(err)
						console.warn(`Could not fetch ${categories[k][1]}`)
						leaderboard.horde[categories[k][2]][categories[k][3]] = NA
					})
			} else {
				await fetch(url+categories[k][0], get)
					.then(res => res.json())
					.then(async json => {
						console.info(categories[k][1])
						let runs = json.data.runs;
						for(let i = 0; i < 3; i++){
							if(runs[i]){
								leaderboard.walker["2p"].wave6[i] = {
									players: [],
									place: place(runs[i]),
									time: runs[i].time()
								}
								for(let j = 0; j < 2; j++){
									await fetch(runs[i].uri(j), get).then(res => res.json()).then(json => {
										if(!leaderboard.walker["2p"].wave6[i].region){
											leaderboard.walker["2p"].wave6[i].region = region(json.data)
										}
										leaderboard.walker["2p"].wave6[i].players.push(name(json.data))
									}).catch(err => {
										leaderboard.walker["2p"].wave6[i].players.push(runs[i].run.players[j].name)
									})
								}
							}
						}
					})
					.catch(err => {
						console.error(err)
						console.warn(`Could not fetch ${categories[k][1]}`)
						leaderboard.horde[categories[k][2]][categories[k][3]] = NA
					})
				await fetch(url+"n2yozzzd", get)
					.then(res => res.json())
					.then(async json => {
						console.info("Tutorial%")
						let runs = json.data.runs;
						for(let i = 0; i < 3; i++){
							await fetch(runs[i].uri(0), get).then(res => res.json()).then(json => {
								let player = json.data
								leaderboard.tutorial[i] = {
									player: name(player),
									region: region(player),
									place: place(runs[i]),
									time: runs[i].time()
								}
							})
						}
					})
					.catch(err => {
						console.error(err)
						console.warn("Could not fetch Tutorial%")
						leaderboard.tutorial = NA
					})
			}
		}
		console.groupEnd()
		module.exports = resolve(leaderboard)
	})()
})