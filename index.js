const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

const teamsRoutes = require("./teams/routes");

app.use("/teams", teamsRoutes);

// Sample create document
// async function sampleCreate() {
//   const demo_doc = {
//     demo: "doc demo",
//     hello: "world",
//   };
//   const demo_create = await db
//     .collection(DB_COLLECTION_NAME)
//     .insertOne(demo_doc);

//   console.log("Added!");
//   console.log(demo_create.insertedId);
// }

// Endpoints

app.get("/ping", async (req, res) => {
  res.send("pong!!");
});

// app.get("/demo", async (req, res) => {
//   await sampleCreate();
//   res.send({ status: 1, message: "demo" });
// });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
