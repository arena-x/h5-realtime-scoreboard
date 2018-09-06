var keystone = require('keystone');
exports.supporters = function (req, res) {
	var locals = {};

	keystone.list('Data').model.find().sort('index').exec(function (err, result) {
		locals = result;
		res.send(locals);
	});
};
