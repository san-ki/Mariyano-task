async function handleErr(req, res, err) {
  console.log(`${err}`);
  switch (err.message) {
    case "test":
      break;

    default:
      res.status(500).send({ status: false, message: err.message });
      break;
  }
}

module.exports = { handleErr };
