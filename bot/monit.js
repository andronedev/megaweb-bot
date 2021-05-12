var mongo = require("mongodb");

const Discord = require("discord.js");
const Monitor = require("ping-monitor");

async function stop(db, m_id, info, MonitorApp, removedb = true) {
  try {
    if (removedb) {
      await db.collection("monit").deleteOne({ _id: m_id });
      console.log("arret du bot " + m_id);
    } else {
      try {
        await info.delete();
      } catch {}
    }

    MonitorApp.stop();
  } catch (e) {
    console.log(e); // 30
  }
}

async function addmonit(url, urlname, interval, channelid, userid, db, client) {
  var channel = client.channels.cache.get(channelid);
  const loading = new Discord.MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Chargement ..")
    .setTimestamp();
  try {
    var info = await channel.send(loading);
  } catch (error) {
    return;
  }

  const monitdb = db.collection("monit");
  // create a document to be inserted
  const m = {
    guildid: info.guild.id,
    channelid: channelid,
    messageid: info.id,
    url: url,
    name: urlname,
    interval: interval,
    userid: userid,
  };
  const result = await monitdb.insertOne(m);

  const m_id = new mongo.ObjectID(result.insertedId);
  startmonit(db, m_id, url, urlname, interval, info);
}
async function startmonit(db, m_id, url, urlname, interval, info) {
  const monitdb = db.collection("monit");
  const MonitorApp = new Monitor({
    website: url,
    title: urlname,
    interval: interval,
    ignoreSSL:true,
  });

  var intervalcheck = setInterval(() => {
    monitdb
      .find({ _id: m_id })
      .count()
      .then((c) => {
        if (c != 1) {
          stop(db, m_id, info, MonitorApp, false);
          clearInterval(intervalcheck);
        }
      });
  }, 5000);
  MonitorApp.on("up", function (res, state) {
    const timesw = new Date().toLocaleTimeString();

    console.log("Yay!! " + res.website + " is up.");
    var embed = new Discord.MessageEmbed()
      .setColor("#008000")
      .setTitle(urlname)
      .setURL(url)
      .addField(
        "En ligne 🌐",
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
      stop(db, m_id, info, MonitorApp, true);
    }
  });

  MonitorApp.on("down", function (res) {
    const timesw = new Date().toLocaleTimeString();

    console.log("Oh Snap!! " + res.website + " is down! " + res.statusMessage);
    var embedfalse = new Discord.MessageEmbed()
      .setColor("#008000")
      .setTitle(urlname)
      .setURL(url)
      .addField("Hors ligne 🔌", ` \`\`\`css\n \n\`\`\` ` + "\n", true)
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
      stop(db, m_id, info, MonitorApp, true);
    }
  });

  MonitorApp.on("error", function (error) {
    console.log(error);
    const timesw = new Date().toLocaleTimeString();

    var embedfalse = new Discord.MessageEmbed()
      .setColor("#008000")
      .setTitle(urlname)
      .setURL(url)
      .addField("Hors ligne 🔌", ` \`\`\`css\n \n\`\`\` ` + "\n", true)
      .addField(
        "Mise a jour à",
        ` \`\`\`flex\n${timesw} \n\`\`\` ` + "\n",
        true
      )
      .addField("info", ` \`\`\`css\n${error.code} \n\`\`\` ` + "\n", false);

    try {
      info.edit(embedfalse);
    } catch (error) {
      console.log(error);
      stop(db, m_id, info, MonitorApp, true);
    }
  });
}
async function resumemonits(client) {
  const monitdb = client.db.collection("monit");
  monitdb
    .find()
    .toArray()
    .then((ms) => {
      ms.map((m) => {
        console.log("Resume Monitor : `" + m.name + "` URL : `" + m.url+"`");
        client.channels.cache
          .get(m.channelid)
          .messages.fetch({ around: m.messageid, limit: 1 })
          .then((info) => {
            const m_id = new mongo.ObjectID(m["_id"]);
            startmonit(
              client.db,
              m_id,
              m.url,
              m.name,
              m.interval,
              info.first()
            );
          });
      });
    });
}

module.exports = { addmonit, resumemonits };
