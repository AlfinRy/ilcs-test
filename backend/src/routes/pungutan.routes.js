module.exports = (app) => {
	const pungutanController = require('../controllers/pungutan.controller.js');
	var router = require('express').Router();

	router.post('/', pungutanController.create);
	router.get('/', pungutanController.findAll);
	router.get('/search', pungutanController.findOneSearch);
	router.get('/:id', pungutanController.findOne);
	router.put('/:id', pungutanController.update);
	router.delete('/:id', pungutanController.delete);

	app.use('/api/pungutan', router);
};
