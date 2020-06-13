exports.execute = async(client, message, args) => {
    if (!args.length) {
        return message.channel.send(`veuillez indiquer l'url, ${message.author} !`);
    }
    const url = args[1];
    message.delete().catch(O_o => {});

    const chauncey = require('chauncey');

    chauncey({
        url: url,
        token: 'ed9696a1b80115f5748c8e61986f36572660affa',
        done: (error, result) => {
            if (error) {

                return console.log(error.message);
            }

            console.log(result);

            const embed = {
                "url": "https://discordapp.com",
                "color": 3553599,
                "footer": {
                    "icon_url": "",
                    "text": "MegaWeb, AndroneDev#8964"
                },
                "fields": [{
                        "name": "lien original",
                        "value": "```" + url + "```"
                    },
                    {
                        "name": "Lien raccourci",
                        "value": "```" + result + "```"
                    }
                ]
            };
            message.channel.send({ embed });
        }
    });

}



exports.info = {
    name: "bitly",
    alias: [],
    permission: "default",
    type: "web",
    active: true

};