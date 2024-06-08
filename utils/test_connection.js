// Database Details
const DB_USER = process.env["DB_USER"];
const DB_PWD = process.env["DB_PWD"];
const DB_URL = process.env["DB_URL"];
const DB_NAME = "task-sanket";
const DB_COLLECTION_NAME = "players";

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://" +
  DB_USER +
  ":" +
  DB_PWD +
  "@" +
  DB_URL +
  "/?retryWrites=true&w=majority";

const url = "mongodb://127.0.0.1:27017";

const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(DB_NAME);
    db = client.db(DB_NAME);
    console.log("You successfully connected to MongoDB!");
  } catch (e) {
    console.log(`connection error: `, e);
    throw e;
  } finally {
    console.log("testing connection");
  }
}
