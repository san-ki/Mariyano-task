const connection = require("./../utils/connection");
const {
  INVALID_TEAM_SIZE,
  INVALID_PLAYER,
  INVALID_TEAM_CONFIG,
  INVALID_TEAM_NAME,
} = require("./../utils/constants");
const Team = require("./model");
const Player = require("./../player/model");
class Client extends connection {
  async test() {
    console.log(`log from client`);
  }

  async #validateTeam(teamName, data) {
    if (data.length != 11) throw new Error(INVALID_TEAM_SIZE);
    let minCount = 1,
      maxCount = 8,
      captainCount = 0,
      viceCaptainCount = 0;
    let count = {
      ar: 0,
      bwl: 0,
      bat: 0,
      wk: 0,
    };
    let team = [];
    for (var d of data) {
      let playerInfo = await Player.findOne({ Player: d.name });
      if (!playerInfo) throw new Error(INVALID_PLAYER);
      if (playerInfo.Role == "BOWLER") count.bwl++;
      if (playerInfo.Role == "ALL-ROUNDER") count.ar++;
      if (playerInfo.Role == "WICKETKEEPER") count.wk++;
      if (playerInfo.Role == "BATTER") count.bat++;

      if (d.role == "CAPTAIN") captainCount++;
      if (d.role == "VICE_CAPTAIN") viceCaptainCount++;

      let obj = {
        name: playerInfo.Player,
        isCaptain: d.role == "CAPTAIN",
        isViceCaptain: d.role == "VICE_CAPTAIN",
      };
      team.push(obj);
      // console.log(playerInfo);
    }
    for (var c in count) {
      console.log(count[c]);
      if (
        (count[c] < minCount && count[c] > maxCount) ||
        captainCount != 1 ||
        viceCaptainCount != 1
      )
        throw new Error(INVALID_TEAM_CONFIG);
    }
    return team;
    // console.log(data);
  }

  async addTeam(data) {
    if (!data.name) throw new Error(INVALID_TEAM_NAME);
    let team = await this.#validateTeam(data.name, data.players);
    await Team.create({
      name: data.name,
      players: team,
    });
    // console.log(data);
  }
}

const client = new Client();
module.exports = client;
