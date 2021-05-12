const { Router } = require('express');

module.exports.Router = class Routes extends Router {
	constructor() {
		super();

		this.get('/', function (req, res) {
			return res.render("index.ejs",{
				user:req.user
			});
		});
	}
};

module.exports.page = '/';