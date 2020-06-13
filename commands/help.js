const Discord = require('discord.js');
const chalk = require('chalk');

exports.execute = (client, message, args) => {
        message.delete().catch(O_o => {});

        var generalCommands = "";
        var infoCommands = "";
        var webCommands = "";
        var adminCommands = "";
        var ownerCommands = "";

        client.commands.forEach(command => {
            switch (command.info.type) {
                case "general":
                    generalCommands += command.info.name + "\n";
                    break;

                case "info":
                    infoCommands += command.info.name + "\n";
                    break;

                case "web":
                    webCommands += command.info.name + "\n";
                    break;

                case "admin":
                    adminCommands += command.info.name + "\n";
                    break;

                case "owner":
                    ownerCommands += command.info.name + "\n";
                    break;


            }
        });

        var infobot = "MegaWeb est un bot utiles pour tout ce qui touche le web / internet"
        var creditinfo = "MegaWeb, AndroneDev#8964"
        var embed = new Discord.MessageEmbed()
            .setColor(9955331)
            .addField("Général Commandes", ` \`\`\`css\n${generalCommands}\n\`\`\` ` + "\n", true)
            .addField("Info Commandes", ` \`\`\`css\n${infoCommands}\n\`\`\` ` + "\n", true)
            .addField("web Commandes", ` \`\`\`css\n${webCommands}\n\`\`\` ` + "\n", true)
            .addField("Informations", ` \`\`\`fix\n${infobot}\n\`\`\` ` + "\n", )
            .addField("Credits", `${creditinfo}\n[Forum](https://devshare.xyz) \n[Discord](https://discord.gg/XxkVKGd) \n[Github](https://github.com/andronedev/megaweb-bot)\n<3` + "\n", );


        message.channel.send(embed);

        console.log(`${(chalk.green(`${message.author.username}`))}` +' sur '+ (chalk.magenta(`${message.guild.name}`)) + ' salon ' + (chalk.magenta(`${message.channel.name}`))+' : ' + ' A ouvert la fonction [' + (chalk.cyan(` COMMANDS `))+ ']\n--------------------------------------')     

};

exports.info = {
    name: "help",
    alias: ["cmds", "cmd", "commands"],
    permission: "default",
    type: "info",
    active: true

};