const TeamsClient = require("./client");
const { handleErr } = require("./../utils/utils");

const teams = {
  test: async function (req, res) {
    try {
      res.send("hi");
    } catch (error) {
      handleErr(req, res, error);
    }
  },
};

module.exports = teams;
