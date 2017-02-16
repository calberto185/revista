'use strict';

/**
 * @ngdoc overview
 * @name app
 * @description
 * # app
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'firebase',
    'ngMdIcons',
    'slick'
  ])
  .config(function($mdAriaProvider) {
   $mdAriaProvider.disableWarnings();
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/details/:type/:name/:uid', {
        templateUrl: 'views/details.html',
        controller: 'DetailsCtrl',
        controllerAs: 'details'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  // .run(function($rootScope, fb, $cookieStore, $location, $log){

  //   $rootScope.$on('$routeChangeStart', function(event, next, current){
  //     if ($cookieStore.get('uid') === undefined || $cookieStore.get('uid')===null) {
  //       if (next.templateUrl==='views/main.html') {
  //         $location.path('/');
  //       }
  //       if (next.templateUrl==='views/login.html') {
  //         $location.path('/login');
  //       }
  //       if (next.templateUrl==='views/details.html') {
  //         $location.path('/details');
  //       }
  //     }else{
  //       $location.path('/home');
  //       if (next.templateUrl==='views/login.html' || next.templateUrl==='views/login.html') {
  //         $location.path('/home');
  //       }
  //     }
  //   })
  // })
  .controller('CTRLTab', function($scope, $mdSidenav, $location){
    //toogle Navbar
    $scope.MenuBar=buildToggler('left');
    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    };
    $scope.login=function(option){
      $scope.userlog={option:'Registrar', icon:'whatshot'};
      $location.path('/'+option);
    }
  });
