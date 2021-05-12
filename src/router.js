const fs = require("fs");
const express = require("express");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const MongoStore = require("connect-mongo");

class Dashboard {
  constructor(client) {
    this.app = express();
    this.client = client;
    this.store = MongoStore.create({
      mongoUrl: client.config.mongodb.url,
      dbName: client.config.mongodb.dbname,
      collectionName: "sessions",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }, // See below for details
    });

    this.setup();
    this.routes();

    console.log(
      `Dashboard launched on the port ${this.client.config.dashboard.port}`
    );
    console.log(
      `Access it at : ${this.client.config.dashboard.url}${
        this.client.config.dashboard.port !== 80
          ? ":" + this.client.config.dashboard.port
          : ""
      }`
    );
  }

  setup() {
    this.app.use(express.json());
    this.app.set("view engine", "ejs");
    this.app.use(express.static("style"));
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(expressLayouts);
    this.app.use(
      session({
        secret: this.client.config.salt,
        store: this.store,
        resave: true,
        saveUninitialized: true,
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
      })
    );

    this.app.use((req, res, next) => {
      req.user = req.session.user;
      req.client = this.client;
      req.config = this.client.config.dashboard;
      req.db = this.client.db;

      next();
    });

    this.app.listen(this.client.config.dashboard.port);
  }

  routes() {
    const files = fs
      .readdirSync("./routes/")
      .filter((file) => file.endsWith(".js"));

    for (const file of files) {
      const route = require(`../routes/${file}`);

      if (!this.client.config.supportGuild.enabled && route.page === "/support")
        return;

      this.app.use(route.page, new route.Router());

      console.log(`Route ${file.split(".")[0].toLowerCase()} launched`);
    }
  }
}

module.exports = Dashboard;
