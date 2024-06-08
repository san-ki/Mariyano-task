const connection = require("./../utils/connection");
const fs = require("fs");
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

  async getScore(team, matchData) {
    let totalScore = 0;
    for (var p of team) {
      let playerObj = matchData[p.name];
      // console.log(playerObj, p.name);
      let score = 0;
      if (playerObj) {
        score =
          playerObj.battScore + playerObj.bowlScore + playerObj.fieldScore;
        if (p.isCaptain) {
          console.log("captain", p.name);
          score = score * 2;
        }
        if (p.isViceCaptain) {
          console.log("vice captain", p.name);
          score = score * 1.5;
        }
        // if (player.is)
      }
      totalScore += score;
    }
    return totalScore;
  }

  async crunchData(data) {
    let crunch = {};

    let isMaiden = false;

    for (var d of data) {
      let obj = {
        battScore: 0,
        bowlScore: 0,
        fieldScore: 0,
        isBatter: null,
        has30: false,
        has50: false,
        has100: false,
        has3Wicket: false,
        has4Wicket: false,
        has5Wicket: false,
        totalRuns: 0,
        totalWickets: 0,
        totalCatch: 0,
        has3Catch: false,
      };
      if (!crunch[d.batter]) crunch[d.batter] = JSON.parse(JSON.stringify(obj));
      if (!crunch[d.bowler]) crunch[d.bowler] = JSON.parse(JSON.stringify(obj));
      if (!crunch[d.player_out])
        crunch[d.player_out] = JSON.parse(JSON.stringify(obj));
      if (!crunch[d.filders_involed])
        crunch[d.filters_involed] = JSON.parse(JSON.stringify(obj));

      // batsman score count
      if (d.batsman_run) {
        if (crunch[d.batter].isBatter == null) {
          // console.log(d.batter);
          let playerInfo = await Player.findOne({ Player: d.batter });

          crunch[d.batter].isBatter = [
            "BATTER",
            "ALL-ROUNDER",
            "WICKETKEEPER",
          ].includes(playerInfo.Role);
        }
        crunch[d.batter].battScore++;
        if (d.batsman_run == 4) crunch[d.batter].battScore += 1;
        if (d.batsman_run == 6) crunch[d.batter].battScore += 2;
        if (d.batsman_run == 6) crunch[d.batter].battScore += 2;
        crunch[d.batter].totalRuns += d.batsman_run;
        if (crunch[d.batter].totalRuns >= 30 && !crunch[d.batter].has30) {
          crunch[d.batter].battScore += 4;
          crunch[d.batter].has30 = true;
        }
        if (crunch[d.batter].totalRuns >= 50 && !crunch[d.batter].has50) {
          crunch[d.batter].battScore += 8;
          crunch[d.batter].has50 = true;
        }
        if (crunch[d.batter].totalRuns >= 100 && !crunch[d.batter].has100) {
          crunch[d.batter].battScore += 16;
          crunch[d.batter].has100 = true;
        }

        // duck out HAD TO WATCH YOU TUBE FOR THIS
        if (
          d.isWicketDelivery &&
          crunch[d.batter].totalRuns == 0 &&
          crunch[d.batter].isBatter
        ) {
          crunch[d.batter].battScore -= 2;
        }
      }

      // bowler score count
      if (d.batsman_run) isMaiden = false;
      if (d.ballnumber == 6 && isMaiden) {
        crunch[d.bowler].bowlScore += 12;
        isMaiden = false;
      }
      if (d.isWicketDelivery && d.kind.toLowerCase() != "run out") {
        crunch[d.bowler].bowlScore += 25;
        if (d.kind.toLowerCase() == "lbw" || d.kind.toLowerCase() == "bowled") {
          crunch[d.bowler].bowlScore += 8;
        }
        crunch[d.bowler].totalWickets++;
        if (crunch[d.bowler].totalWickets == 3) crunch[d.bowler].bowlScore += 4;
        if (crunch[d.bowler].totalWickets == 4) crunch[d.bowler].bowlScore += 8;
        if (crunch[d.bowler].totalWickets == 5)
          crunch[d.bowler].bowlScore += 16;
      }

      // fielder score count
      if (d.isWicketDelivery) {
        switch (d.kind.toLowerCase()) {
          case "run out":
            crunch[d.fielders_involved].fieldScore += 6;
            break;

          case "catch":
            crunch[d.fielders_involved].fieldScore += 8;
            crunch[d.fielders_involved].totalCatch++;
            if (crunch[d.fielders_involved].totalCatch == 3)
              crunch[d.fielders_involved].fieldScore += 4;
            break;

          case "stumping":
            crunch[d.fielders_involved].fieldScore += 12;
            break;

          default:
            break;
        }
      }
    }

    return crunch;
  }

  async processResult(data) {
    let matchData = require("./../data/match.json");
    if (!data) data = matchData;
    let crunchData = await this.crunchData(data);
    // console.log(crunchData);
    // fs.writeFileSync("test.json", JSON.stringify(crunchData));
    let teams = await Team.find();
    for (var t of teams) {
      let score = await this.getScore(t.players, crunchData);
      console.log(score);
      await Team.findOneAndUpdate({ _id: t._id }, { score: score });
    }
    console.log(teams.length);
  }

  async teamResult(data) {
    let teams = await Team.find({}, { name: 1, score: 1 });
    let result = [];
    for (var t of teams) {
      console.log(t);
      result.push({
        name: t.name,
        score: t.score,
      });
    }
    return result;
  }
}

const client = new Client();
module.exports = client;
