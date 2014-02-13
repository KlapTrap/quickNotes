'use strict';

angular.module('notesApp').controller('MainCtrl', function ($scope, $resource, $http) {
	var ending = false,
		currentEndChars = '',
		currentEndingLength = 0;
	$scope.currentEndChars = ''
	$scope.endChar = ']';
	$scope.endedChar = '[';
	$scope.endChars = $scope.endChar + $scope.endedChar;
	$scope.endingChars = $scope.endChar  + '/';
	
	$scope.notes = [];

	var TodaysNotesR = $resource('http://localhost:8081/notes', {today: true});

	$scope.notes = TodaysNotesR.query();

	var Notes = $resource('http://localhost:8081/notes');

    $scope.checkForEnd = function() {
    	if($scope.userHasEnded()){
			$scope.addNewNote();
		}    
	};

	$scope.userHasEnded = function() {
    	var ended = ($scope.noteData.indexOf($scope.endChars) > 0);

    	// Just ended as a normal note
    	if(ended) {
    		currentEndChars = $scope.endChars;
    		return true;
    	}

    	if(!$scope.ending){
    		$scope.ending = (containsChar($scope.noteData, $scope.endingChars));
    		if($scope.ending) {
    			currentEndChars = $scope.endingChars;
    			currentEndingLength = currentEndChars.length;
    		}
    	} else {
    		$scope.ending = (containsChar($scope.noteData, $scope.endingChars));
    		if(!$scope.ending) {
    			return false;
    		}

    		var endChar = $scope.noteData.slice(-1);
    		console.log($scope.noteData.length , currentEndingLength);
    		if($scope.noteData.length < currentEndingLength) {
    			currentEndChars = currentEndChars.substring(0, currentEndChars.length - 1);
    		} else {
    			currentEndChars += endChar;
    			
    		}
    		currentEndingLength = $scope.noteData.length;

    		console.log(currentEndChars);
    		if(endChar ===  $scope.endedChar) {
    			return true;
    		}
    	}
    	return false;
	};

	$scope.getTags = function () {
		var allTypes = [
				{name: 'todo', chars: '/to'},
				{name: 'important', chars: '/imp'}
			],
			tags = [];


		angular.forEach(allTypes, function(value, key){
			console.log(key, value, currentEndChars);
			if(containsChar(currentEndChars, value.chars)) {
				tags.push(value.name);
			};
		});
		console.log(tags);
		return tags;

	};

	function containsChar(string, chars) {
		if(!string.indexOf) {
			return false;
		}

		return (string.indexOf(chars) > 0);
	}

	$scope.generateTimeStampID = function () {
		var d = new Date();
		return d.getDate().toString() + d.getMonth().toString() + d.getFullYear().toString();
	}

	$scope.generateCreatedDate = function () {
		var a_p = "",
			d = new Date(),
			curr_hour = d.getHours();

		if (curr_hour < 12) {
		   a_p = "AM";
		} else {
		   a_p = "PM";
		}
		if (curr_hour == 0) {
		   curr_hour = 12;
		}
		if (curr_hour > 12) {
		   curr_hour = curr_hour - 12;
		}

		var curr_min = d.getMinutes();

		curr_min = curr_min + "";

		if (curr_min.length == 1) {
		   curr_min = "0" + curr_min;
		}

		return curr_hour + " : " + curr_min + " " + a_p;
	}

	$scope.getCleanNote = function () {
		var dirtyChars = currentEndChars
		var endPoint = $scope.noteData.indexOf(dirtyChars);
		return $scope.noteData.substr(0, endPoint) + $scope.noteData.substr((endPoint + dirtyChars.length), $scope.noteData.length);
	}

	$scope.addNewNote = function () {

		var cleanNoteData = $scope.getCleanNote(),
			tags = $scope.getTags(),
			newNote = {data: cleanNoteData, tags: tags, date: $scope.generateCreatedDate()},
			newNoteToSave = newNote;


		newNoteToSave.saveDate = $scope.generateTimeStampID();
		var newNotedb = new Notes(newNoteToSave);
		newNotedb.$save(function() {
			$scope.notes.push(newNote);
			console.log($scope.notes);
			$scope.noteData = '';
		});
	};
  });
