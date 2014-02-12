var db = {},
	notesCollection = {}
module.exports = {
	// Init the notes routes with a connection to the db
	init: function (mdb) {
		db = mdb
		notesCollection = db.collection('notes');
	},
	create: function (req, res) {
		notesCollection.insert({data: req.body.data, date: req.body.date, saveDate: req.body.saveDate}, function(err, docs) {
			if(!err) {
				console.log('Saved ', docs)
				res.json({success: true});
			}
		})
	},
	read: function (req, res) {
		res.end('read')
		
	},
	readAll: function (req, res) {
		console.log(req.query)
		if(req.query.today){
			// A request for only todays notes
			var d = new Date();
			var todaysCursor = notesCollection.find({saveDate: d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString()});
			return todaysCursor.toArray(function(err, docs) {
				res.json(docs);
			})
		}
		var cursor = notesCollection.find();

		cursor.toArray(function(err, docs) {
			res.json({success: true, results: docs});
		})
	}
	update: function (req, res) {
		res.end('update')
	},
	delete: function (req, res) {
		res.end('delete')
	}
};