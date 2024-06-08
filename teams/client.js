const connection = require("./../utils/connection");
class Client extends connection {
  async test() {
    console.log(`log from client`);
  }
}

const client = new Client();
module.exports = client;
