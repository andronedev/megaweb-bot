const Discord = require("discord.js");
var moment3 = require('moment');
moment3.locale('FR');
const db = require('quick.db');

exports.execute = async(client) => {

    tomonit = db.all();
    console.log("XX DB XX")
    console.log(tomonit)
    console.log("XX    XX")
    tomonit.forEach(el => {




        const acheck = db.get(el.ID + '.url');
        const nameurl = db.get(el.ID + '.namemonit');
        intervala = db.get(el.ID + '.intervalmonit');
        const channelid = db.get(el.ID + '.channelid');

        const loading = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Chargement ..')
            .setImage("https://media.giphy.com/media/VseXvvxwowwCc/giphy.gif")
            .setTimestamp()

        console.log(el.ID + acheck + nameurl + intervala)
        try {

            client.channels.cache.get(channelid).messages.fetch({ around: el.ID, limit: 1 })

            .then(async msg => {

                const info = msg.first();

                const Monitor = require('ping-monitor');


                const myMonitor = new Monitor({
                    website: acheck,
                    title: '',
                    interval: intervala // minutes
                });

                const loading = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Chargement ..')
                
                .setTimestamp()
    
                info.edit(loading);

                myMonitor.on('up', function(res, state) {
                    const timesw = moment3().format('LTS')


                    console.log('Yay!! ' + res.website + ' is up.');
                    var embed = new Discord.MessageEmbed()
                        .setColor('#008000')
                        .setTitle(nameurl)
                        .setURL(acheck)
                        .addField("En ligne <a:6181_check:714414520734449716>", ` \`\`\`css\n${res.responseTime} ms\n\`\`\` ` + "\n", true)

                    .addField("Mise a jour à", ` \`\`\`flex\n${timesw} \n\`\`\` ` + '\n', true)

                    .addField("info", ` \`\`\`css\n${res.statusMessage}\n\`\`\` ` + '\n', false)


                    try {
                        info.edit(embed);
                    } catch (error) {
                        console.log(error)
                        myMonitor.stop()
                        stop(el.ID)

                    }


                });


                myMonitor.on('down', function(res) {

                    const timesw = moment3().format('LTS')


                    console.log('Oh Snap!! ' + res.website + ' is down! ' + res.statusMessage);
                    var embedfalse = new Discord.MessageEmbed()
                        .setColor('#008000')
                        .setTitle(nameurl)
                        .setURL(acheck)
                        .addField("Hors ligne <:DND:713065165548945489>", ` \`\`\`css\n \n\`\`\` ` + "\n", true)
                        .addField("Mise a jour à", ` \`\`\`flex\n${timesw} \n\`\`\` ` + '\n', true)
                        .addField("info", ` \`\`\`css\n${res.statusMessage} \n\`\`\` ` + '\n', false)


                    try {
                        info.edit(embedfalse);
                    } catch (error) {
                        console.log(error)
                        myMonitor.stop()
                        stop(el.ID)

                    }


                });

                myMonitor.on('error', function(error) {
                    console.log(error);
                    const timesw = moment3().format('LTS')

                    var embedfalse = new Discord.MessageEmbed()
                        .setColor('#008000')
                        .setTitle(nameurl)
                        .setURL(acheck)
                        .addField("Hors ligne <:DND:713065165548945489>", ` \`\`\`css\n \n\`\`\` ` + "\n", true)
                        .addField("Mise a jour à", ` \`\`\`flex\n${timesw} \n\`\`\` ` + '\n', true)
                        .addField("info", ` \`\`\`css\n${error.code} \n\`\`\` ` + '\n', false)


                    try {
                        info.edit(embedfalse);
                    } catch (error) {
                        console.log(error)
                        myMonitor.stop()
                        stop(el.ID)


                    }

                });


            })

            //const info = el.ID;

        } catch (error) {
            stop(el.ID)

        }


    });

    async function stop(id){
        db.delete(id)

    }
}