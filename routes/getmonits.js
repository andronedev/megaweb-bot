const { Router } = require("express");
module.exports.Router = class Routes extends (
  Router
) {
  constructor() {
    super();

    this.get("/", async function (req, res) {
      if (!req.user || !req.query.id) return res.send({ success: false });
      var monits = []
      try {
        monits = await req.db
        .collection("monit")
        .find({ userid: req.user.me.id, guildid: req.query.id }).toArray()
      } catch (e) {
        console.log(e); // 30
      }
      return res.send({ success:true,monits:monits });
    });
  }
};

module.exports.page = "/getmonits";
