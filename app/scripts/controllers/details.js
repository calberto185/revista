'use strict';

/**
 * @ngdoc function
 * @name app.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('DetailsCtrl', function ($scope, $location) {
  	var uid=convertPath($location.path());
  	$scope.id=uid;
    console.log(uid);
  });
function convertPath(path){
	return path.split('/').pop();
};