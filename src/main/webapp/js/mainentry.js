
var app = angular.module('myApp', []);
app.controller('EntryController', function($scope, $http) {

	console.log("initialize app");

	$scope.options = [{ name: "Crime", id: 1 }, { name: "Disaster", id: 2 }];
	$scope.selectedOption = $scope.options[1];
	


	$scope.addIncident = function(lat, lon, infomation) {
	};



});