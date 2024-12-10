module.exports = (app) => {
	const entitasController = require('../controllers/entitas.controller.js');
	var router = require('express').Router();

	router.post('/', entitasController.create);
	router.get('/', entitasController.findAll);
	router.get('/search', entitasController.findOneSearch);
	router.get('/:id', entitasController.findOne);
	router.put('/:id', entitasController.update);
	router.delete('/:id', entitasController.delete);

	app.use('/api/entitas', router);
};
