module.exports = (app) => {
	const utamaController = require('../controllers/utama.controller.js');

	var router = require('express').Router();

	router.post('/', utamaController.create);
	router.get('/', utamaController.findAll);
	router.get('/search', utamaController.findOneSearch);
	router.get('/:id', utamaController.findOne);
	router.put('/:id', utamaController.update);
	router.delete('/:id', utamaController.delete);

	app.use('/api/utama', router);
};
