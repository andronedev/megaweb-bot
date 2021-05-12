const { Router } = require("express");
var mongo = require('mongodb');
module.exports.Router = class Routes extends (
  Router
) {
  constructor() {
    super();

    this.post("/", async function (req, res) {
      if (!req.user || !req.body.id) return res.send({ success: false });

      try {
        var o_id = new mongo.ObjectID(req.body.id);
        await req.db
        .collection("monit")
        .deleteOne({ userid: req.user.me.id, "_id": o_id })
      } catch (e) {
        console.log(e); // 30
        return res.send({ success:false });
      }
      return res.send({ success:true });
    });
  }
};

module.exports.page = "/removemonit";
