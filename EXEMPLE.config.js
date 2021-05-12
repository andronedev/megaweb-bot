module.exports = {
    client: {
        token: 'token du bot',
    },

    dashboard: {
        url: 'http://localhost',
        publicurl:"http://localhost:3000",
        port: 3000,
        secret: 'secret of the app discord',
    },

    autoRedirect: false,

    supportGuild: {
        enabled: true,
        urlCode: 'ygGQXhAn',
    },
    mongodb :{
        url :"",
        dbname : "megaweb"
    },
    salt:"random string" 

};

/*
 https://discord.com/developers/applications pour obtenir le token du bot et le secret
 Pour mongodb vous pouvez utiliser https://www.mongodb.com/cloud/atlas ou un serveur en local
*/