const fetch = require('node-fetch');
const { Router } = require("express");
const { addmonit } = require("../bot/monit");
module.exports.Router = class Routes extends (
  Router
) {
  constructor() {
    super();

    this.post("/", async function (req, res) {
      if (!req.user) return res.send({ success: false });

      var url = req.body.url;
      const name = req.body.name;
      const channelid = req.body.channelid;
      const interval = req.body.interval;

      if (!url || !name || !channelid || !interval || interval < 5)
        return res.send({ success: false });
      try {
         let urlredirected = await fetch(url, {
          method: 'GET',
          redirect: 'follow'
        });
        url = urlredirected.url
        console.log(url)
      } catch (error) {
        console.log(error)
      }

      addmonit(url, name, interval, channelid, req.user.me.id, req.db,req.client);
      return res.send({ success: true });
    });
  }
};

module.exports.page = "/addmonit";
