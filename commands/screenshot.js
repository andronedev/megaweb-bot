var request = require('request');
const fs = require("fs");
const Discord = require("discord.js");
var imgur = require('imgur');
var randomstring = require("randomstring");
var base64Img = require('base64-img');
var lineReader = require('line-reader');

exports.execute = async(client, message, args) => {

        msgid = await message.channel.send("<a:8299_Loading:705914419502252103>")
        const url = args[1];
        console.log(url)


        message.delete().catch(O_o => {});



        var headers = {
            'authority': 'www.googleapis.com',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36 Edg/81.0.416.68',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',

        };

        var options = {
            url: 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=' + url + '&screenshot=true&key=AIzaSyDwunZB1iOz_u22HzRyV3za05_SasHNOig',
            headers: headers
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {

                try {
                    el = JSON.parse(body)

                } catch (e) {
                    console.log("erreur au niveau du json")
                }

                //ICI C QUE C BON

                //var id = randomstring.generate(30);
                //var filepath = base64Img.imgSync(el.lighthouseResult.audits["final-screenshot"].details.data, './temp', id);


                var imgurFavicon = el.lighthouseResult.audits["final-screenshot"].details.data;
                imgurFavicon = imgurFavicon.substring(23) //data:image/jpeg;base64,
                    //console.log(imgurFavicon)
                imgur.uploadBase64(imgurFavicon)
                    .then(function(json) {
                        console.log(json.data.link);

                        const embed = {
                            "url": url,
                            "color": 3553599,
                            "title": url,
                            "footer": {
                                "icon_url": "",
                                "text": "MegaWeb, Darktrojan"
                            },
                            "image": {
                                "url": json.data.link
                            }
                        };
                        // msgid.edit("<@" + message.author.id + "> ```" + el.id + "```\n" + );
                        msgid.edit("", { embed });
                    })
                    .catch(function(err) {
                        console.error(err.message);
                    });

                //   console.log(filepath)




            } else {
                console.log("Erreur au niveau de la requête -- " + error)
                msgid.edit("Une erreur est survenue..")
            }

        }

        request(options, callback);


    },

    exports.info = {
        name: "screenshot",
        alias: ["screen"],
        permission: "default",
        type: "web",
        active: true

    };