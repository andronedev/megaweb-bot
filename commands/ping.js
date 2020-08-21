exports.execute = async(client, message, args) => {

    message.delete().catch(O_o => {});

    try {

        let responseMessage = await message.channel.send("PINGing...");

        await responseMessage.edit(`\`${responseMessage.createdTimestamp - message.createdTimestamp} Ms\``);
    } catch (e) {
        console.log(e);
    }
};

exports.info = {
    name: "ping",
    alias: [],
    permission: "default",
    type: "general",
    active: true

};