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
				}
			},
			tutorial: []
		},
		NA = [,,,].fill({player: "<name>", place: 0, time: "N/A", region: "black"}),

		loaded = 0,

		name = p => (p.names || 0).international || "<name>",
		region = p => (p.location || {country:0}).country.code || "black",
		place = r => r.place || 0,

		get = {method: "Get"},
		url = "https://www.speedrun.com/api/v1/leaderboards/m1z73360/category/",
		categories = [
			["wdmzez52", "Tournament/Sigs", "sigs"],
			["wdmzez52?var-5lypvpyl=z19ggzjl", "Tournament/NoSigs", "nosigs"],
			["02qvnl7d?var-kn0jo43l=5q88rxgq", "Walker Attack/1 Player 1 Bot/Wave 6", "1p1b", "wave6", "walker"],
			["wdm66m3k?var-ylpegpj8=gq7dg0pq", "Horde/1 Player 1 Bot/Wave 11", "1p1b", "wave11", "horde"],
			["wdm66m3k", "Horde/2 Players/Wave 11", "2p", "wave11"],
			["wdm66m3k?var-9l779p9l=jq6k3ynl", "Horde/2 Players/Wave 21", "2p", "wave21"],
			["wdm66m3k?var-9l779p9l=5lmjz8yl", "Horde/2 Players/Wave 26", "2p", "wave26"],
			["wdm66m3k?var-ylpegpj8=jq6k34nl", "Horde/3 Players/Wave 11", "3p", "wave11"],
			["wdm66m3k?var-ylpegpj8=jq6k34nl&var-9l779p9l=jq6k3ynl", "Horde/3 Players/Wave 21", "3p", "wave21"],
			["wdm66m3k?var-ylpegpj8=jq6k34nl&var-9l779p9l=5lmjz8yl", "Horde/3 Players/Wave 26", "3p", "wave26"],
			["wdm66m3k?var-ylpegpj8=5lmjzxyl", "Horde/4 Players/Wave 11", "4p", "wave11"],
			["wdm66m3k?var-ylpegpj8=5lmjzxyl&var-9l779p9l=jq6k3ynl", "Horde/4 Players/Wave 21", "4p", "wave21"],
			["wdm66m3k?var-ylpegpj8=gq7dg0pq", "Horde/1 Player 1 Bot/Wave 11"],
			["02qvnl7d", "Walker Attack/2 Players/Wave 6"]
		];

	Object.prototype.uri = function(a){return this.run.players[a].uri};
	Object.prototype.time = function(a){return (t => `${t/60|0}:${(t%60>9?"":"0")+t%60}` || "N/A")(this.run.times.primary_t)};

	console.group("Fetching leaderboard");
	
	(async function(){
		for(let k = 0; k < 15; k++){
			if(k < 2){
				await fetch(`${url}${categories[k][0]}`, get)
					.then(res => res.json())
					.then(async json => {
						console.info(categories[k][1])
						let runs = json.data.runs;
						for(let i = 0; i < 3; i++){
							await fetch(runs[i].uri(0), get).then(res => res.json()).then(json => {
								let player = json.data
								leaderboard.tournament.[categories[k][2]][0] = {
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
						leaderboard.tournament.[categories[k][2]] = NA
					})
			} else if(k < 4){
				await fetch(`${url}${categories[k][0]}`, get)
					.then(res => res.json())
					.then(async json => {
						console.info(categories[k][1])
						let runs = json.data.runs;
						for(let i = 0; i < 3; i++){
							await fetch(runs[i].uri(0), get).then(res => res.json()).then(json => {
								let player = json.data
								leaderboard.[categories[k][4]][categories[k][2]][0] = {
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
						leaderboard.tournament.[categories[k][2]] = NA
					})
			} else if(k < 14){
				/*await fetch(`${url}${categories[k][0]}`, get)
					.then(res => res.json())
					.then(async json => {
						console.info(categories[k][1])
						let runs = json.data.runs;
						for(let i = 0; i < 3; i++){
							await fetch(runs[i].uri(0), get).then(res => res.json()).then(json => {
								let player = json.data
								leaderboard.tournament.[categories[k][2]][0] = {
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
						leaderboard.tournament.[categories[k][2]] = NA
					})*/
			} else {
				await fetch(`${url}n2yozzzd}`, get)
					.then(res => res.json())
					.then(async json => {
						console.info("Tutorial%")
						let runs = json.data.runs;
						for(let i = 0; i < 3; i++){
							await fetch(runs[i].uri(0), get).then(res => res.json()).then(json => {
								let player = json.data
								leaderboard.tutorial = {
									player: name(player),
									region: region(player),
									place: place(runs[0]),
									time: runs[0].time()
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
		console.log(leaderboard)
		module.exports = resolve(leaderboard)
	})()
	
	/*
	 *	You may notice that I did not use any for loops here. I tried that already.
	 *	They do not work properly as fetch() works rather asyncronously.
	 *	The for loop will run its way and all the Promises will use the final
	 *	value instead of each of them individually.
	 */
	/*
	fetch(`${url}wdmzez52`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Tournament/Sigs")
			let runs = json.data.runs;
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.sigs[0] = {
					player: name(player),
					region: region(player),
					place: place(runs[0]),
					time: runs[0].time()
				}
				loaded++
			})
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.sigs[1] = {
					player: name(player),
					region: region(player),
					place: place(runs[1]),
					time: runs[1].time()
				}
				loaded++
			})
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.sigs[2] = {
					player: name(player),
					region: region(player),
					place: place(runs[2]),
					time: runs[2].time()
				}
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Tournament/Sigs")
			leaderboard.tournament.sigs = NA
		})
	fetch(`${url}wdmzez52?var-5lypvpyl=z19ggzjl`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Tournament/NoSigs")
			let runs = json.data.runs;
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.nosigs[0] = {
					player: name(player),
					region: region(player),
					place: place(runs[0]),
					time: runs[0].time()
				}
				loaded++
			})
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.nosigs[1] = {
					player: name(player),
					region: region(player),
					place: place(runs[1]),
					time: runs[1].time()
				}
				loaded++
			})
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tournament.nosigs[2] = {
					player: name(player),
					region: region(player),
					place: place(runs[2]),
					time: runs[2].time()
				}
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Tournament/NoSigs")
			leaderboard.tournament.nosigs = NA
		})
	fetch(`${url}n2yozzzd`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Tutorial%")
			let runs = json.data.runs;
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tutorial[0] = {
					player: name(player),
					region: region(player),
					place: place(runs[0]),
					time: runs[0].time()
				}
				loaded++
			})
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tutorial[1] = {
					player: name(player),
					region: region(player),
					place: place(runs[1]),
					time: runs[1].time()
				}
				loaded++
			})
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.tutorial[2] = {
					player: name(player),
					region: region(player),
					place: place(runs[2]),
					time: runs[2].time()
				}
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Tutorial%")
			leaderboard.tutorial = NA
		})
	fetch(`${url}wdm66m3k`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/2 Players/Wave 11")
			let runs = json.data.runs;
			leaderboard.horde["2p"].wave11[0] = {
				players: [],
				place: place(runs[0]),
				time: runs[0].time()
			}
			leaderboard.horde["2p"].wave11[1] = {
				players: [],
				place: place(runs[1]),
				time: runs[1].time()
			}
			leaderboard.horde["2p"].wave11[2] = {
				players: [],
				place: place(runs[2]),
				time: runs[2].time()
			}
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave11[0].region = region(player);
				leaderboard.horde["2p"].wave11[0].players.push(name(player))
				loaded++
			})
			if(runs[0].run.players[1]){
				fetch(runs[0].uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave11[0].players.push(name(json.data))
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave11[1].region = region(player);
				leaderboard.horde["2p"].wave11[1].players.push(name(player))
				loaded++
			})
			if(runs[1].run.players[1]){
				fetch(runs[1].uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave11[1].players.push(name(json.data))
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave11[2].region = region(player);
				leaderboard.horde["2p"].wave11[2].players.push(name(player))
				loaded++
			})
			if(runs[2].run.players[1]){
				fetch(runs[2].uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave11[2].players.push(name(json.data))
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
	fetch(`${url}wdm66m3k?var-9l779p9l=jq6k3ynl`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/2 Players/Wave 21")
			let runs = json.data.runs;
			leaderboard.horde["2p"].wave21[0] = {
				players: [],
				place: place(runs[0]),
				time: runs[0].time()
			}
			leaderboard.horde["2p"].wave21[1] = {
				players: [],
				place: place(runs[1]),
				time: runs[1].time()
			}
			leaderboard.horde["2p"].wave21[2] = {
				players: [],
				place: place(runs[2]),
				time: runs[2].time()
			}
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave21[0].region = region(player);
				leaderboard.horde["2p"].wave21[0].players.push(name(player))
				loaded++
			})
			if(runs[0].run.players[1]){
				fetch(runs[0].uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave21[0].players.push(name(json.data))
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave21[1].region = region(player);
				leaderboard.horde["2p"].wave21[1].players.push(name(player))
				loaded++
			})
			if(runs[1].run.players[1]){
				fetch(runs[1].uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave21[1].players.push(name(json.data))
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave21[2].region = region(player);
				leaderboard.horde["2p"].wave21[2].players.push(name(player))
				loaded++
			})
			if(runs[2].run.players[1]){
				fetch(runs[2].uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave21[2].players.push(name(json.data))
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
	fetch(`${url}wdm66m3k?var-9l779p9l=5lmjz8yl`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/2 Players/Wave 26")
			let runs = json.data.runs;
			leaderboard.horde["2p"].wave26[0] = {
				players: [],
				place: place(runs[0]),
				time: runs[0].time()
			}
			leaderboard.horde["2p"].wave26[1] = {
				players: [],
				place: place(runs[1]),
				time: runs[1].time()
			}
			leaderboard.horde["2p"].wave26[2] = {
				players: [],
				place: place(runs[2]),
				time: runs[2].time()
			}
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave26[0].region = region(player);
				leaderboard.horde["2p"].wave26[0].players.push(name(player))
				loaded++
			})
			if(runs[0].run.players[1]){
				fetch(runs[0].uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave26[0].players.push(name(json.data))
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave26[1].region = region(player);
				leaderboard.horde["2p"].wave26[1].players.push(name(player))
				loaded++
			})
			if(runs[1].run.players[1]){
				fetch(runs[1].uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave26[1].players.push(name(json.data))
					loaded++
				})
			} else {
				loaded++
			}
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["2p"].wave26[2].region = region(player);
				leaderboard.horde["2p"].wave26[2].players.push(name(player))
				loaded++
			})
			if(runs[2].run.players[1]){
				fetch(runs[2].uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["2p"].wave26[2].players.push(name(json.data))
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
	fetch(`${url}wdm66m3k?var-ylpegpj8=jq6k34nl`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/3 Players/Wave 11")
			let runs = json.data.runs;
			leaderboard.horde["3p"].wave11[0] = {
				players: [],
				place: place(runs[0]),
				time: runs[0].time()
			}
			leaderboard.horde["3p"].wave11[1] = {
				players: [],
				place: place(runs[1]),
				time: runs[1].time()
			}
			leaderboard.horde["3p"].wave11[2] = {
				players: [],
				place: place(runs[2]),
				time: runs[2].time()
			}
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave11[0].region = region(player);
				leaderboard.horde["3p"].wave11[0].players.push(name(player))
				loaded++
			})
			fetch(runs[0].uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[0].players.push(name(json.data))
				loaded++
			})
			fetch(runs[0].uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[0].players.push(name(json.data))
				loaded++
			})
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave11[1].region = region(player);
				leaderboard.horde["3p"].wave11[1].players.push(name(player))
				loaded++
			})
			fetch(runs[1].uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[1].players.push(name(json.data))
				loaded++
			})
			fetch(runs[1].uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[1].players.push(name(json.data))
				loaded++
			})
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave11[2].region = region(player);
				leaderboard.horde["3p"].wave11[2].players.push(name(player))
				loaded++
			})
			fetch(runs[2].uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[2].players.push(name(json.data))
				loaded++
			})
			fetch(runs[2].uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave11[2].players.push(name(json.data))
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
	fetch(`${url}wdm66m3k?var-ylpegpj8=jq6k34nl&var-9l779p9l=jq6k3ynl`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/3 Players/Wave 21")
			let runs = json.data.runs;
			leaderboard.horde["3p"].wave21[0] = {
				players: [],
				place: place(runs[0]),
				time: runs[0].time()
			}
			leaderboard.horde["3p"].wave21[1] = {
				players: [],
				place: place(runs[1]),
				time: runs[1].time()
			}
			leaderboard.horde["3p"].wave21[2] = {
				players: [],
				place: place(runs[2]),
				time: runs[2].time()
			}
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave21[0].region = region(player);
				leaderboard.horde["3p"].wave21[0].players.push(name(player))
				loaded++
			})
			fetch(runs[0].uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[0].players.push(name(json.data))
				loaded++
			})
			fetch(runs[0].uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[0].players.push(name(json.data))
				loaded++
			})
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave21[1].region = region(player);
				leaderboard.horde["3p"].wave21[1].players.push(name(player))
				loaded++
			})
			fetch(runs[1].uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[1].players.push(name(json.data))
				loaded++
			})
			fetch(runs[1].uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[1].players.push(name(json.data))
				loaded++
			})
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave21[2].region = region(player);
				leaderboard.horde["3p"].wave21[2].players.push(name(player))
				loaded++
			})
			fetch(runs[2].uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[2].players.push(name(json.data))
				loaded++
			})
			fetch(runs[2].uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave21[2].players.push(name(json.data))
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
	fetch(`${url}wdm66m3k?var-ylpegpj8=jq6k34nl&var-9l779p9l=5lmjz8yl`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/3 Players/Wave 26")
			let runs = json.data.runs,
				run0 = runs[0],
				run1 = runs[1],
				run2 = runs[2];
			leaderboard.horde["3p"].wave26[0] = {
				players: [],
				place: place(run0),
				time: run0.time()
			}
			fetch(run0.uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["3p"].wave26[0].region = region(player);
				leaderboard.horde["3p"].wave26[0].players.push(name(player))
				loaded++
			})
			fetch(run0.uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave26[0].players.push(name(json.data))
				loaded++
			})
			fetch(run0.uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["3p"].wave26[0].players.push(name(json.data))
				loaded++
			})
			if(run1){
				leaderboard.horde["3p"].wave26[1] = {
					players: [],
					place: place(run1),
					time: run1.time()
				}
				fetch(run1.uri(0), get).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["3p"].wave26[1].region = region(player);
					leaderboard.horde["3p"].wave26[1].players.push(name(player))
					loaded++
				})
				fetch(run1.uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["3p"].wave26[1].players.push(name(json.data))
					loaded++
				})
				fetch(run1.uri(2), get).then(res => res.json()).then(json => {
					leaderboard.horde["3p"].wave26[1].players.push(name(json.data))
					loaded++
				})
			}
			if(run2){
				leaderboard.horde["3p"].wave26[2] = {
					players: [],
					place: place(run2),
					time: run2.time()
				}
				fetch(run2.uri(0), get).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["3p"].wave26[2].region = region(player);
					leaderboard.horde["3p"].wave26[2].players.push(name(player))
					loaded++
				})
				fetch(run2.uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["3p"].wave26[2].players.push(name(json.data))
					loaded++
				})
				fetch(run2.uri(2), get).then(res => res.json()).then(json => {
					leaderboard.horde["3p"].wave26[2].players.push(name(json.data))
					loaded++
				})
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/3 Players/Wave 26")
			leaderboard.tournament.nosigs = NA
		})
	fetch(`${url}wdm66m3k?var-ylpegpj8=5lmjzxyl`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/4 Players/Wave 11")
			let runs = json.data.runs,
				run0 = runs[0],
				run1 = runs[1],
				run2 = runs[2];
			leaderboard.horde["4p"].wave11[0] = {
				players: [],
				place: place(run0),
				time: run0.time()
			}
			leaderboard.horde["4p"].wave11[1] = {
				players: [],
				place: place(run1),
				time: run1.time()
			}
			fetch(run0.uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["4p"].wave11[0].region = region(player);
				leaderboard.horde["4p"].wave11[0].players.push(name(player))
				loaded++
			})
			fetch(run0.uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[0].players.push(name(json.data))
				loaded++
			})
			fetch(run0.uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[0].players.push(name(json.data))
				loaded++
			})
			fetch(run0.uri(3), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[0].players.push(name(json.data))
				loaded++
			})
			fetch(run1.uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["4p"].wave11[1].region = region(player);
				leaderboard.horde["4p"].wave11[1].players.push(name(player))
				loaded++
			})
			fetch(run1.uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[1].players.push(name(json.data))
				loaded++
			})
			fetch(run1.uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[1].players.push(name(json.data))
				loaded++
			})
			.catch(err => {
				leaderboard.horde["4p"].wave11[1].players.push(run1.run.players[2].name)
				loaded++
			})
			fetch(run1.uri(3), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave11[1].players.push(name(json.data))
				loaded++
			})
			.catch(err => {
				leaderboard.horde["4p"].wave11[1].players.push(run1.run.players[3].name)
				loaded++
			})
			if(run2){
				leaderboard.horde["4p"].wave11[2] = {
					players: [],
					place: place(run2),
					time: run2.time()
				}
				fetch(run2.uri(0), get).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave11[2].region = region(player);
					leaderboard.horde["4p"].wave11[2].players.push(name(player))
					loaded++
				})
				fetch(run2.uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave11[2].players.push(name(json.data))
					loaded++
				})
				fetch(run2.uri(2), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave11[2].players.push(name(json.data))
					loaded++
				})
				fetch(run2.uri(3), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave11[2].players.push(name(json.data))
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave11[2].players.push(run2.run.players[3].name)
					loaded++
				})
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/4 Players/Wave 11")
			leaderboard.tournament.nosigs = NA
		})
	fetch(`${url}wdm66m3k?var-ylpegpj8=5lmjzxyl&var-9l779p9l=jq6k3ynl`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/4 Players/Wave 21")
			let runs = json.data.runs,
				run0 = runs[0],
				run1 = runs[1],
				run2 = runs[2];
			leaderboard.horde["4p"].wave21[0] = {
				players: [],
				place: place(run0),
				time: run0.time()
			}
			fetch(run0.uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["4p"].wave21[0].region = region(player);
				leaderboard.horde["4p"].wave21[0].players.push(name(player))
				loaded++
			})
			fetch(run0.uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave21[0].players.push(name(json.data))
				loaded++
			})
			fetch(run0.uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave21[0].players.push(name(json.data))
				loaded++
			})
			fetch(run0.uri(3), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave21[0].players.push(name(json.data))
				loaded++
			})
			if(run1){
				leaderboard.horde["4p"].wave21[1] = {
					players: [],
					place: place(run1),
					time: run1.time()
				}
				fetch(run1.uri(0), get).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave21[1].region = region(player);
					leaderboard.horde["4p"].wave21[1].players.push(name(player))
					loaded++
				})
				fetch(run1.uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[1].players.push(name(json.data))
					loaded++
				})
				fetch(run1.uri(2), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[1].players.push(name(json.data))
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave21[1].players.push(run1.run.players[2].name)
					loaded++
				})
				fetch(run1.uri(3), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[1].players.push(name(json.data))
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave21[1].players.push(run1.run.players[3].name)
					loaded++
				})
			}
			if(run2){
				leaderboard.horde["4p"].wave21[2] = {
					players: [],
					place: place(run2),
					time: run2.time()
				}
				fetch(run2.uri(0), get).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave21[2].region = region(player);
					leaderboard.horde["4p"].wave21[2].players.push(name(player))
					loaded++
				})
				fetch(run2.uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[2].players.push(name(json.data))
					loaded++
				})
				fetch(run2.uri(2), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[2].players.push(name(json.data))
					loaded++
				})
				fetch(run2.uri(3), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave21[2].players.push(name(json.data))
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave21[2].players.push(run2.run.players[3].name)
					loaded++
				})
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/4 Players/Wave 21")
			leaderboard.tournament.nosigs = NA
		})
	/*fetch(`${url}wdm66m3k?var-ylpegpj8=5lmjzxyl&var-9l779p9l=5lmjz8yl`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/4 Players/Wave 26")
			let runs = json.data.runs,
				run0 = runs[0],
				run1 = runs[1],
				run2 = runs[2];
			leaderboard.horde["4p"].wave26[0] = {
				players: [],
				place: place(run0),
				time: run0.time()
			}
			fetch(run0.uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.horde["4p"].wave26[0].region = region(player);
				leaderboard.horde["4p"].wave26[0].players.push(name(player))
				loaded++
			})
			fetch(run0.uri(1), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave26[0].players.push(name(json.data))
				loaded++
			})
			fetch(run0.uri(2), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave26[0].players.push(name(json.data))
				loaded++
			})
			fetch(run0.uri(3), get).then(res => res.json()).then(json => {
				leaderboard.horde["4p"].wave26[0].players.push(name(json.data))
				loaded++
			})
			if(run1){
				leaderboard.horde["4p"].wave26[1] = {
					players: [],
					place: place(run1),
					time: run1.time()
				}
				fetch(run1.uri(0), get).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave26[1].region = region(player);
					leaderboard.horde["4p"].wave26[1].players.push(name(player))
					loaded++
				})
				fetch(run1.uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[1].players.push(name(json.data))
					loaded++
				})
				fetch(run1.uri(2), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[1].players.push(name(json.data))
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave26[1].players.push(run1.run.players[2].name)
					loaded++
				})
				fetch(run1.uri(3), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[1].players.push(name(json.data))
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave26[1].players.push(run1.run.players[3].name)
					loaded++
				})
			}
			if(run2){
				leaderboard.horde["4p"].wave26[2] = {
					players: [],
					place: place(run2),
					time: run2.time()
				}
				fetch(run2.uri(0), get).then(res => res.json()).then(json => {
					let player = json.data;
					leaderboard.horde["4p"].wave26[2].region = region(player);
					leaderboard.horde["4p"].wave26[2].players.push(name(player))
					loaded++
				})
				fetch(run2.uri(1), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[2].players.push(name(json.data))
					loaded++
				})
				fetch(run2.uri(2), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[2].players.push(name(json.data))
					loaded++
				})
				fetch(run2.uri(3), get).then(res => res.json()).then(json => {
					leaderboard.horde["4p"].wave26[2].players.push(name(json.data))
					loaded++
				})
				.catch(err => {
					leaderboard.horde["4p"].wave26[2].players.push(run2.run.players[3].name)
					loaded++
				})
			}
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/4 Players/Wave 26")
			leaderboard.tournament.nosigs = NA
		})* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	fetch(`${url}wdm66m3k?var-ylpegpj8=gq7dg0pq`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Horde/1 Player 1 Bot/Wave 11")
			let runs = json.data.runs;
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.horde["1p1b"].wave11[0] = {
					player: name(player),
					region: region(player),
					place: place(runs[0]),
					time: runs[0].time()
				}
				loaded++
			})
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.horde["1p1b"].wave11[1] = {
					player: name(player),
					region: region(player),
					place: place(runs[1]),
					time: runs[1].time()
				}
				loaded++
			})
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.horde["1p1b"].wave11[2] = {
					player: name(player),
					region: region(player),
					place: place(runs[2]),
					time: runs[2].time()
				}
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Horde/1 Player 1 Bot/Wave 11")
			leaderboard.tutorial = NA
		})
	fetch(`${url}02qvnl7d?var-kn0jo43l=5q88rxgq`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Walker Attack/1 Player 1 Bot/Wave 6")
			let runs = json.data.runs;
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.walker["1p1b"].wave6[0] = {
					player: name(player),
					region: region(player),
					place: place(runs[0]),
					time: runs[0].time()
				}
				loaded++
			})
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.walker["1p1b"].wave6[1] = {
					player: name(player),
					region: region(player),
					place: place(runs[1]),
					time: runs[1].time()
				}
				loaded++
			})
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data
				leaderboard.walker["1p1b"].wave6[2] = {
					player: name(player),
					region: region(player),
					place: place(runs[2]),
					time: runs[2].time()
				}
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Walker Attack/1 Player 1 Bot/Wave 6")
			leaderboard.tutorial = NA
		})
	fetch(`${url}02qvnl7d`, get)
		.then(res => res.json())
		.then(json => {
			console.info("Walker Attack/2 Players/Wave 6")
			let runs = json.data.runs;
			leaderboard.walker["2p"].wave6[0] = {
				players: [],
				place: place(runs[0]),
				time: runs[0].time()
			}
			leaderboard.walker["2p"].wave6[1] = {
				players: [],
				place: place(runs[1]),
				time: runs[1].time()
			}
			leaderboard.walker["2p"].wave6[2] = {
				players: [],
				place: place(runs[2]),
				time: runs[2].time()
			}
			fetch(runs[0].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.walker["2p"].wave6[0].region = region(player);
				leaderboard.walker["2p"].wave6[0].players.push(name(player))
				loaded++
			})
			fetch(runs[0].uri(1), get).then(res => res.json()).then(json => {
				leaderboard.walker["2p"].wave6[0].players.push(name(json.data))
				loaded++
			})
			fetch(runs[1].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.walker["2p"].wave6[1].region = region(player);
				leaderboard.walker["2p"].wave6[1].players.push(name(player))
				loaded++
			})
			fetch(runs[1].uri(1), get).then(res => res.json()).then(json => {
				leaderboard.walker["2p"].wave6[1].players.push(name(json.data))
				loaded++
			})
			fetch(runs[2].uri(0), get).then(res => res.json()).then(json => {
				let player = json.data;
				leaderboard.walker["2p"].wave6[2].region = region(player);
				leaderboard.walker["2p"].wave6[2].players.push(name(player))
				loaded++
			})
			fetch(runs[2].uri(1), get).then(res => res.json()).then(json => {
				leaderboard.walker["2p"].wave6[2].players.push(name(json.data))
				loaded++
			})
		})
		.catch(err => {
			console.error(err)
			console.warn("Could not fetch Walker Attack/2 Players/Wave 6")
			leaderboard.tournament.nosigs = NA
		})
	let a = setInterval(function(){
		if(loaded == 63){
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
		}, 15000)*/
})