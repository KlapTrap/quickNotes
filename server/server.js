var express	= require('express'),
	app 	= express(),
	path 	= require('path'),
	routes 	= require('./routes'),
	dbUrl	= "mongodb://localhost:27017/notesdb"
	mongoClient = require('mongodb').MongoClient; 

mongoClient.connect(dbUrl, function(err, db) {
	app.use(express.bodyParser());	
	app.use(express.cookieParser());

	app.use(express['static'](path.join(__dirname, '/app/dist')));	

	var port = 8081;

	routes(app, db)

	app.listen(port)
	console.log('Listening on port ' + port)	
})
