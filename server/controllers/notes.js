var db = {},
	notesCollection = {}
module.exports = {
	// Init the notes routes with a connection to the db
	init: function (mdb) {
		db = mdb
		notesCollection = db.collection('notes');
	},
	create: function (req, res) {
		notesCollection.insert({data: req.body.data, date: req.body.date}, function(err, docs) {
			if(!err) {
				res.json({success: true});
			}
		})
	},
	read: function (req, res) {
		res.end('read')
		
	},
	readAll: function (req, res) {
		var cursor = notesCollection.find();

		cursor.toArray(function(err, docs) {
			res.json({success: true, results: docs});
		})
	},
	update: function (req, res) {
		res.end('update')
	},
	delete: function (req, res) {
		res.end('delete')
	}
};