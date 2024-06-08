(async function () {
  const fs = require("fs");

  // user when run independently
  // require("dotenv").config({ path: "../.env" });

  // use when run by script
  require("dotenv").config({ path: ".env" });
  const Team = require("../teams/model");
  const Player = require("../player/model");

  async function importPlayers() {
    await Player.deleteMany();
    let playersData = require("./../data/players.json");
    for (var p of playersData) {
      await Player.create(p);
    }
    let data = await Player.find();
    console.log(data);
  }

  async function importMatches() {
    await Team.deleteMany();
    let teamsData = require("./../data/match.json");
    for (var p of playersData) {
      await Player.create(p);
    }
    let data = await Player.find();
    console.log(data);
  }

  await importPlayers();
  process.exit();
})();
