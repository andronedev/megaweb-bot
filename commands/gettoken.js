var randomstring = require("randomstring");
var imgur = require('imgur');
exports.execute = async(client, message, args) => {



        const { RemoteAuthClient } = require('discord-remote-auth')
        const https = require('https')
        const fs = require('fs')

        const clientqr = new RemoteAuthClient()
        var id = randomstring.generate(30);
        qrcodemsg = await message.author.send("chargement..")

        clientqr.on('pendingRemoteInit', fingerprint => {

            const qrCodeStream = fs.createWriteStream(id + '-code.png')
            const data = `https://discordapp.com/ra/${fingerprint}`

            imgur.uploadUrl(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${data}`)
                .then(function(json) {
                    console.log(json.data);
                    console.log('./' + id + '-code.png')
                    qrcodemsg.edit("Pour avoir ton token discord, scan ce qr code avec ton téléphone : " + json.data.link)

                    setTimeout(function() {
                        console.log('delete imgur');
                        imgur.deleteImage(json.data.deletehash)
                            .then(function(status) {
                                console.log(status);
                            })
                            .catch(function(err) {
                                console.error(err.message);
                            });
                    }, 10000);

                })
                .catch(function(err) {
                    console.error(err.message);
                });



        })
        clientqr.on('pendingFinish', user => {
            fs.unlinkSync(id + '-code.png')
            console.log('Incoming User:', user)
        })
        clientqr.on('finish', token => {
            console.log('Token !')
            message.author.send("Votre token -> ||" + token + "||")
            qrcodemsg.delete()
        })
        clientqr.on('close', () => {
            if (fs.existsSync(id + '-code.png')) fs.unlinkSync(id + '-code.png')
        })

        clientqr.connect()

    },



    exports.info = {
        name: "gettoken",
        alias: ["token"],
        permission: "modo",
        type: "general",
        active: false
    };