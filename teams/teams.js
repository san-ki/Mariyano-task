const TeamsClient = require("./client");
const { handleErr } = require("./../utils/utils");
const constants = require("./../utils/constants");
console.log(typeof handleErr);

const teams = {
  test: async function (req, res) {
    try {
      res.send("hi");
    } catch (error) {
      handleErr(req, res, error);
    }
  },

  addTeam: async function (req, res) {
    try {
      console.log("here");
      await TeamsClient.addTeam(req.body);
      res.status(200).send({ status: true, message: "team created!!" });
    } catch (error) {
      console.log("in catch");
      handleErr(req, res, error);
    }
  },
};

module.exports = teams;
