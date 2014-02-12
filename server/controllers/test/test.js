var assert = require('assert'),
	notesController = require('../notes'),
	dbUrl	= "mongodb://localhost:27017/notesdb"
	mongoClient = require('mongodb').MongoClient,
	db = {};

describe('Notes backend api', function () {
	before(function (done) {
		mongoClient.connect(dbUrl, function(err, db) {
			notesController.init(db)
			done()
		})
		
	})
	describe('Create a new note', function () {
		it('should return inserted', function() {

			var fakeReq = {body: {data: "this is a message", date: "now"}},
				fakeRes = {end: function(res) { assert.equal(res.success, true, "Could not add new note") }}
			
			notesController.create(fakeReq, fakeRes);
		})
	})
	describe('Get all notes', function () {
		it('should return', function() {

			var fakeRes = {end: function(res) { assert.equal(res.success, true, "Could not get all notes") }}
			var fakeReq = null;

			notesController.readAll(fakeReq, fakeRes);
		})
	})
})