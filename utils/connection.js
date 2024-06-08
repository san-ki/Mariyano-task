const { MongoClient, ServerApiVersion } = require("mongodb");

class Connection {
  constructor() {
    this.db = null;
    this.dbUser = process.env.DB_USER;
    this.dbPwd = process.env.DB_PWD;
    this.dbUrl = process.env.DB_URL;
    this.dbName = process.env.DB_NAME;

    this.client = new MongoClient(this.dbUrl, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    this.init();
  }

  async init() {
    try {
      await this.client.connect();
      await this.client.db("admin").command({ ping: 1 });
      console.log(this.dbName);
      this.db = this.client.db(this.dbName);
      console.log("You successfully connected to MongoDB!");
    } catch (e) {
      console.log(`connection error: `, e);
      throw e;
    } finally {
      console.log("testing connection");
    }
  }

  async testConn() {
    try {
      await this.client.db("admin").command({ ping: 1 });
      console.log("You successfully connected to MongoDB!");
      return true;
    } catch (error) {
      console.log("connection failed, try calling init");
      console.log(error);
      return false;
    }
  }
}

const connection = new Connection();
connection.init();

module.exports = Connection;
module.exports.connection = connection;
