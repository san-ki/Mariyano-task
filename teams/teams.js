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

  processResult: async function (req, res) {
    try {
      await TeamsClient.processResult();
      res.status(200).send({ status: true, message: "data processed!!" });
    } catch (error) {
      handleErr(req, res, error);
    }
  },

  teamResult: async function (req, res) {
    try {
      let result = await TeamsClient.teamResult();
      res.status(200).send({ status: true, data: result });
    } catch (error) {
      handleErr(req, res, error);
    }
  },
};

module.exports = teams;
