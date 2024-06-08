const app = require("express").Router();
const teams = require("./teams");

app.get("/test", teams.test);
app.post("/add-team", teams.addTeam);

module.exports = app;
