const Discord = require('discord.js');

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
            const embed = new Discord.MessageEmbed()
            .setDescription(`**Lien orriginal :**<${url}>\n**Lien raccourci :** <${result}>`);
            message.channel.send(embed)
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