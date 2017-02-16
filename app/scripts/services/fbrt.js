'use strict';

/**
 * @ngdoc service
 * @name app.FBRT
 * @description
 * # FBRT
 * Factory in the app.
 */
angular.module('app')
  .factory('FBRT', function () {
    var config = {
      apiKey: "AIzaSyDnIcVcyd6ZpASfusiqG5w4Sxy23hBgqFg",
      authDomain: "apprevista-766aa.firebaseapp.com",
      databaseURL: "https://apprevista-766aa.firebaseio.com",
      storageBucket: "apprevista-766aa.appspot.com",
      messagingSenderId: "127650536098"
    };
    firebase.initializeApp(config);
    return firebase;
    
  });
