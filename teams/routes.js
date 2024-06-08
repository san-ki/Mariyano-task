const app = require("express").Router();
const teams = require("./teams");

app.get("/test", teams.test);

module.exports = app;
