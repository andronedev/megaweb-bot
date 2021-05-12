const { resumemonits } = require("./bot/monit");
const { Client } = require("discord.js");
const Dashboard = require("./src/router");
const client = new Client();
client.config = require("./config");

const MongoClient = require("mongodb").MongoClient;

client.on("ready", () => {
  client.dashboard = new Dashboard(client);
  resumemonits(client);
});
client.on("newUser", (user) =>
  console.log(`${user.username} just logged into the dashboard`)
);
client.on("message", (message) => {
  if (message.content.startsWith("!help"))
    message.reply(client.config.dashboard.publicurl);
});

var mongoClient = new MongoClient(client.config.mongodb.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
try {
  mongoClient.connect(function (err, mongoClient) {
    console.log("Connected successfully to server");
    client.db = mongoClient.db(client.config.mongodb.dbname);
    client.login(client.config.client.token);
  });
} catch (err) {
  log("ERROR while connecting to database");
  console.log(err);
  mongoClient.close();
}
