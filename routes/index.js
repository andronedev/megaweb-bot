const { Router } = require('express');

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			// if (!req.user) return res.redirect('/login');

			// return res.send({
			// 	client: req.client.user.username,
			// 	session: req.user ? req.user.me.username : false,
			// });
			return res.redirect('/dashboard');
		});
	}
};

module.exports.page = '/';