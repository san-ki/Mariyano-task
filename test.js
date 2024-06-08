(async function () {
  let players = require("./data/players.json");

  let data = [
    {
      Player: "RD Gaikwad",
      Team: "Chennai Super Kings",
      Role: "BATTER",
    },
    {
      Player: "DP Conway",
      Team: "Chennai Super Kings",
      Role: "BATTER",
    },
    {
      Player: "MM Ali",
      Team: "Chennai Super Kings",
      Role: "ALL-ROUNDER",
    },
    {
      Player: "N Jagadeesan",
      Team: "Chennai Super Kings",
      Role: "WICKETKEEPER",
    },
    {
      Player: "AT Rayudu",
      Team: "Chennai Super Kings",
      Role: "WICKETKEEPER",
    },
    {
      Player: "MS Dhoni",
      Team: "Chennai Super Kings",
      Role: "WICKETKEEPER",
    },
    {
      Player: "MJ Santner",
      Team: "Chennai Super Kings",
      Role: "ALL-ROUNDER",
    },
    {
      Player: "Simarjeet Singh",
      Team: "Chennai Super Kings",
      Role: "BOWLER",
    },
    {
      Player: "Mukesh Choudhary",
      Team: "Chennai Super Kings",
      Role: "BOWLER",
    },
    {
      Player: "PH Solanki",
      Team: "Chennai Super Kings",
      Role: "BOWLER",
    },
    {
      Player: "M Pathirana",
      Team: "Chennai Super Kings",
      Role: "BOWLER",
    },
  ];
  let playersList = [],
    count = 0;
  for (var d of players) {
    if (count == 11) break;
    let obj = {
      name: d.Player,
      role: "",
    };
    if (d.Role == "BATTER") {
      playersList.push(obj);
      count++;
      console.log(count);
    }
  }
  console.log(JSON.stringify(playersList));
})();
