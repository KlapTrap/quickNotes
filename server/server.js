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

	app.use(function (req, res, next) {

	    // Website you wish to allow to connect
	    res.setHeader('Access-Control-Allow-Origin', '*');

	    // Request methods you wish to allow
	    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // Request headers you wish to allow
	    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // Set to true if you need the website to include cookies in the requests sent
	    // to the API (e.g. in case you use sessions)
	    res.setHeader('Access-Control-Allow-Credentials', true);

	    // Pass to next layer of middleware
	    next();
	});


	routes(app, db)

	app.listen(port)
	console.log('Listening on port ' + port)	
})
