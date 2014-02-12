'use strict';
var controllerPath 	= '../controllers',
	path 			= require('path'),
 	noteController 	= require(path.join(controllerPath, 'notes')) 


 module.exports = function (app, db) {
 	noteController.init(db);

 	app.post('/notes', noteController.create);
 	app.get('/notes/:id', noteController.read);
 	app.get('/notes', noteController.readAll);
 	app.put('/notes/:id', noteController.update);
 	app.delete('/notes/:id', noteController.delete);

 }