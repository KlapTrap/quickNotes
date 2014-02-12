'use strict';

angular.module('notesApp').controller('MainCtrl', function ($scope, $resource, $http) {
	var end = '][';
  	$scope.notes = [];

  	

	var TodaysNotesR = $resource('http://localhost:8081/notes', {today: true});

  	var todaysNotes = TodaysNotesR.query(function () {
  		$scope.notes = todaysNotes;
  	});

	var Notes = $resource('http://localhost:8081/notes');
	// var todaysNotes = $resource('http://localhost:8081/notes', {}, {
	// 	query: {method:'GET', params:{}, }
	// })



    $scope.checkForEnd = function() {

    	var ended = $scope.noteData.indexOf(end)
    	if(ended > 0){

			var a_p = "";
			var d = new Date();
			var curr_hour = d.getHours();
			if (curr_hour < 12)
			   {
			   a_p = "AM";
			   }
			else
			   {
			   a_p = "PM";
			   }
			if (curr_hour == 0)
			   {
			   curr_hour = 12;
			   }
			if (curr_hour > 12)
			   {
			   curr_hour = curr_hour - 12;
			   }

			var curr_min = d.getMinutes();

			curr_min = curr_min + "";

			if (curr_min.length == 1)
			   {
			   curr_min = "0" + curr_min;
			   }

			var newNote = {data: $scope.noteData.substr(0, ended) + $scope.noteData.substr(ended + end.length, $scope.noteData.length), date: curr_hour + " : " + curr_min + " " + a_p}
			var newNoteToSave = newNote
			newNoteToSave.saveDate = d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString()
			var newNotedb = new Notes(newNoteToSave)
			newNotedb.$save(function() {
				$scope.notes.push(newNote);
    			$scope.noteData = '';
			})

    		
		}    
	}
  });
