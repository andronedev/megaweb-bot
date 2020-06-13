var request = require('request');
const fs = require("fs");
const Discord = require("discord.js");
var moment3 = require('moment');
moment3.locale('FR');
var randomstring = require("randomstring");
var base64Img = require('base64-img');
var lineReader = require('line-reader');
exports.execute = async(client, message, args) => {
        const acheck = args[1];
        const nameurl = args[2];
        const intervala = 5;


        message.delete().catch(O_o => {});

        if (!args[1]) {
            return message.channel.send(`Veuillez indiquer l'url du serveur : \`\`\`css\n` + client.config.PREFIX + `setmonitweb [url site web] [nom a afficher] [intervalle]\`\`\` ${message.author}!`);
        }
        if (!args[2]) {
            return message.channel.send(`Veuillez indiquer le nom du serveur : \`\`\`css\n` + client.config.PREFIX + `setmonitweb [url site web] [nom a afficher] [intervalle]\`\`\` ${message.author}!`);
        }
        if (args[3] && args[3] > 1) {

            var intervala = args[3];

        } else {
            intervala = 5
            message.channel.send(`intervalle de verification (defaut): 5 minutes`);
        }
        const loading = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Chargement ..')
            //<a:8299_Loading:705914419502252103>
            .addField("<a:8299_Loading:705914419502252103>", "_ _")
            .setTimestamp()

        const info = await message.channel.send(loading);




        const Monitor = require('ping-monitor');


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
                .addField("En ligne <a:6093_Animated_Checkmark:705916106745053234>", ` \`\`\`css\n${res.responseTime} ms\n\`\`\` ` + "\n", true)

            .addField("Mise a jour à", ` \`\`\`flex\n${timesw} \n\`\`\` ` + '\n', true)

            .addField("info", ` \`\`\`css\n${res.statusMessage}\n\`\`\` ` + '\n', false)




            try {
                info.edit(embed);
            } catch (error) {
                console.log(error)
                myMonitor.stop()

            }


        });


        myMonitor.on('down', function(res) {

            const timesw = moment3().format('LTS')


            console.log('Oh Snap!! ' + res.website + ' is down! ' + res.statusMessage);
            var embedfalse = new Discord.MessageEmbed()
                .setColor('#008000')
                .setTitle(nameurl)
                .setURL(acheck)
                .addField("Hors ligne <a:1603_Animated_Cross:705159317057437707>", ` \`\`\`css\n \n\`\`\` ` + "\n", true)
                .addField("Mise a jour à", ` \`\`\`flex\n${timesw} \n\`\`\` ` + '\n', true)
                .addField("info", ` \`\`\`css\n${res.statusMessage} \n\`\`\` ` + '\n', false)


            try {
                info.edit(embedfalse);
            } catch (error) {
                console.log(error)
                myMonitor.stop()
            }


        });

        myMonitor.on('error', function(error) {
            console.log(error);
            const timesw = moment3().format('LTS')

            var embedfalse = new Discord.MessageEmbed()
                .setColor('#008000')
                .setTitle(nameurl)
                .setURL(acheck)
                .addField("Hors ligne <a:1603_Animated_Cross:705159317057437707>", ` \`\`\`css\n \n\`\`\` ` + "\n", true)
                .addField("Mise a jour à", ` \`\`\`flex\n${timesw} \n\`\`\` ` + '\n', true)
                .addField("info", ` \`\`\`css\n${error.code} \n\`\`\` ` + '\n', false)


            try {
                info.edit(embedfalse);
            } catch (error) {
                console.log(error)
                myMonitor.stop()

            }

        });

    },



    exports.info = {
        name: "setmonitweb",
        alias: ["monit"],
        permission: "modo",
        type: "web",
        active: true

    };