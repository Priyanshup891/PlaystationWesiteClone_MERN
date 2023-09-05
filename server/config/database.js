const mongoose = require("mongoose");
require("dotenv").config();

const connectDatabase = () => {
  const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;
  mongoose
    .connect(
      `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@ac-eqm7zrm-shard-00-00.btcxoei.mongodb.net:27017,ac-eqm7zrm-shard-00-01.btcxoei.mongodb.net:27017,ac-eqm7zrm-shard-00-02.btcxoei.mongodb.net:27017/?ssl=true&replicaSet=atlas-m9c3rk-shard-0&authSource=admin&retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Database is connected!");
    })
    .catch((err) => console.log(`Something is wrong: ${err}`));
};

module.exports = connectDatabase;
