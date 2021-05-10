const { Router } = require("express");
const Monitor = require("ping-monitor");

const Discord = require("discord.js");
module.exports.Router = class Routes extends (
  Router
) {
  constructor() {
    super();

    this.post("/", async function (req, res) {
      const url = req.body.url;
      const name = req.body.name;
      const channelid = req.body.channelid;
      const interval = req.body.interval;
      if (!url || !name || !channelid || !interval || interval < 5)
        return res.send({ success: false });

      var channel = req.client.channels.cache.get(channelid);
      const loading = new Discord.MessageEmbed()
        .setColor("#0099ff")
        .setTitle("Chargement ..")
        .setImage("https://media.giphy.com/media/VseXvvxwowwCc/giphy.gif")
        .setTimestamp();

      var info = await channel.send(loading);
      const myMonitor = new Monitor({
        website: url,
        title: name,
        interval: interval, // minutes
      });
      myMonitor.on("up", function (res, state) {
        const timesw = new Date().toLocaleTimeString();

        console.log("Yay!! " + res.website + " is up.");
        var embed = new Discord.MessageEmbed()
          .setColor("#008000")
          .setTitle(name)
          .setURL(url)
          .addField(
            "En ligne <a:6181_check:714414520734449716>",
            ` \`\`\`css\n${res.responseTime} ms\n\`\`\` ` + "\n",
            true
          )

          .addField(
            "Mise a jour à",
            ` \`\`\`flex\n${timesw} \n\`\`\` ` + "\n",
            true
          )

          .addField(
            "info",
            ` \`\`\`css\n${res.statusMessage}\n\`\`\` ` + "\n",
            false
          );

        try {
          info.edit(embed);
        } catch (error) {
          console.log(error);
          myMonitor.stop();
        }
      });

      myMonitor.on("down", function (res) {
        const timesw = new Date().toLocaleTimeString();

        console.log(
          "Oh Snap!! " + res.website + " is down! " + res.statusMessage
        );
        var embedfalse = new Discord.MessageEmbed()
          .setColor("#008000")
          .setTitle(name)
          .setURL(url)
          .addField(
            "Hors ligne <:DND:713065165548945489>",
            ` \`\`\`css\n \n\`\`\` ` + "\n",
            true
          )
          .addField(
            "Mise a jour à",
            ` \`\`\`flex\n${timesw} \n\`\`\` ` + "\n",
            true
          )
          .addField(
            "info",
            ` \`\`\`css\n${res.statusMessage} \n\`\`\` ` + "\n",
            false
          );

        try {
          info.edit(embedfalse);
        } catch (error) {
          console.log(error);
          myMonitor.stop();
        }
      });

      myMonitor.on("error", function (error) {
        console.log(error);
        const timesw = new Date().toLocaleTimeString();

        var embedfalse = new Discord.MessageEmbed()
          .setColor("#008000")
          .setTitle(name)
          .setURL(url)
          .addField(
            "Hors ligne <:DND:713065165548945489>",
            ` \`\`\`css\n \n\`\`\` ` + "\n",
            true
          )
          .addField(
            "Mise a jour à",
            ` \`\`\`flex\n${timesw} \n\`\`\` ` + "\n",
            true
          )
          .addField(
            "info",
            ` \`\`\`css\n${error.code} \n\`\`\` ` + "\n",
            false
          );

        try {
          info.edit(embedfalse);
        } catch (error) {
          console.log(error);
          myMonitor.stop();
        }
      });

      return res.send({ succes: true });
    });
  }
};

module.exports.page = "/addmonit";
