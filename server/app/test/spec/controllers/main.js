'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('notesApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  describe('userHasEnded', function () {
    it('Should find end.', function () {
      scope.noteData = "dsl[k54fjds" + scope.end + "fjd]34sfkh"
      expect(scope.userHasEnded()).toBe(true);
    });

    it('Should not find end.', function () {

      scope.noteData = "aaaabbbbccccc"
      expect(scope.userHasEnded()).toBe(false);

      scope.noteData = "dslkfjds[f]jd]s[fkh"
      expect(scope.userHasEnded()).toBe(false);
    });
  })

  describe('addNewNote', function () {
    it('Should add new note', function () {
      var testNoteData = "12" + scope.end + "34",
          expectedReturnData = "1234";

      scope.noteData = testNoteData  
      scope.addNewNote();
      console.log(scope.notes)
      expect(scope.notes[0].data).toBe(expectedReturnData);

    })  
  })
  
});
