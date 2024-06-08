const app = require("express").Router();
const teams = require("./teams");

app.get("/test", teams.test);
app.post("/add-team", teams.addTeam);
app.get("/process-result", teams.processResult);
app.get("/team-result", teams.teamResult);

module.exports = app;
