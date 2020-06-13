exports.execute = async(client, message, args) => {

        const sayMessage = args
        message.delete().catch(O_o => {});
        message.channel.send("```flex\n" + sayMessage.substring(client.config.PREFIX.length + 3) + "```");
    },
    exports.info = {
        name: "say",
        alias: [],
        permission: "modo",
        type: "general",
        active: false
    };