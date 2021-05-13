const { Router } = require("express");

module.exports.Router = class Routes extends (
  Router
) {
  constructor() {
    super();

    this.get("/:id?", async function (req, res) {
      if (!req.user) return res.redirect("/login");
      function getguild(guilds, id) {
        /*
        * Recupere le serveur avec l'id mais si il n'y a pas d'id il prendre le premier qui rempli les critères
        * Attention : retourne null si rien est n'est ok 
        */
        if (!id) id = true;
        var g = null;
        for (var i = 0; i < guilds.length; i++) {
          if (
            guilds[i].id == id ||
            (id == true && (guilds[i].permissions & 0x8) == 0x8)
          ) {
            guilds[i].botin = check(guilds[i].id);
            if (guilds[i].botin) {
              const server = req.client.guilds.cache.get(guilds[i].id);
              guilds[i].channels = server.channels.cache;
              g = guilds[i];
              break;
            }
          }
        }
        return g;
      }
      function check(id) {
        const server = req.client.guilds.cache.get(id);
        if (server) return true;
        return false;
      }
      function getguilds(guilds) {
        var g = [];
        for (var i = 0; i < guilds.length; i++) {
          if (guilds[i].permissions & 0x8) {
            guilds[i].botin = check(guilds[i].id);

            g.push(guilds[i]);
          }
        }
        return g;
      }

      var guilds = getguilds(req.user.guilds).sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      var theguild = getguild(req.user.guilds, req.params.id);
      return res.render("dashboard.ejs", {
        user: req.user.me,
        guilds: guilds,
        guild: theguild,
        currentid: theguild ? theguild.id || "" : null,
      });
    });
  }
};

module.exports.page = "/dashboard";
