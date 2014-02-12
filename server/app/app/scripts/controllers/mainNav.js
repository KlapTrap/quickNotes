'use strict';
angular.module('notesApp').controller('mainNavCtrl', ['$scope', '$location',
    function($scope, $location) {
        $scope.navClass = function(page) {
            var currentRoute = $location.path().substring(1) || 'home';
            return page === currentRoute ? 'active' : '';
        };

        $scope.navigateTo = function(route) {
        	$location.path(route);
        }

    }
]);