const mongoose = require("mongoose");

const dbName = process.env.DB_NAME;
console.log(dbName);

// throw new Error("soidfjsdfoij");

// mongoose
//   .connect(`mongodb://localhost/${dbName}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

module.exports = mongoose;
