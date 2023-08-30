const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let mongodbUrl =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect(mongodbUrl);
  database = client.db("online-shop");
}

function getDb() {
  if (!database) {
    throw new Error("Please connect to a Database!");
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
