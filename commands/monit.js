const Discord = require("discord.js");
var moment3 = require('moment');
moment3.locale('FR');
const db = require('quick.db');
const Monitor = require('ping-monitor');


exports.execute = async(client, message, args) => {
        const acheck = args[1];
        const nameurl = args[2];
        intervala = 5;


        message.delete().catch(O_o => {});

        if (!args[2]) {
            return message.channel.send(`Veuillez indiquer l'url du serveur : \`\`\`css\n` + client.config.PREFIX + `setmonitweb [url site web] [nom a afficher] [intervalle (en minutes) (min 5minutes) ]\`\`\` ${message.author}!`);
        }
        if (!args[2]) {
            return message.channel.send(`Veuillez indiquer le nom du serveur : \`\`\`css\n` + client.config.PREFIX + `setmonitweb [url site web] [nom a afficher] [intervalle (en minutes) (min 5minutes) ]\`\`\` ${message.author}!`);
        }
        if (args[3] && args[3] >= 5) {

            intervala = args[3];

        } else {
            intervala = 5
            message.channel.send(`Verification toutes les 5 minutes`);
        }
        const loading = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Chargement ..')
            .setTimestamp()

        const info = await message.channel.send(loading);


        db.set(info.id, { url: acheck, namemonit: nameurl, intervalmonit: intervala, channelid: info.channel.id })




        const myMonitor = new Monitor({
            website: acheck,
            title: '',
            interval: intervala // minutes
        });


        myMonitor.on('up', function(res, state) {
            const timesw = moment3().format('LTS')


            console.log('Yay!! ' + res.website + ' is up.');
            var embed = new Discord.MessageEmbed()
                .setColor('#008000')
                .setTitle(nameurl)
                .setURL(acheck)
                .addField("En ligne <:true:743036721591222284>", ` \`\`\`css\n${res.responseTime} ms\n\`\`\` ` + "\n", true)

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
                .addField("Hors ligne <:false:743036722312511498>", ` \`\`\`css\n \n\`\`\` ` + "\n", true)
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
                .addField("Hors ligne <:false:743036722312511498>", ` \`\`\`css\n \n\`\`\` ` + "\n", true)
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

        async function stop(id){
            db.delete(id)
    
        }
    },



    exports.info = {
        name: "setmonitweb",
        alias: ["monit"],
        permission: "modo",
        type: "web",
        active: true

    };