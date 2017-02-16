'use strict';

/**
 * @ngdoc function
 * @name app.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
  .run(function(FBRT, Events, $timeout, dataUser, posts ){
  	FBRT.auth().onAuthStateChanged(function(user) {
    $timeout(function(){
      if (FBRT.auth().currentUser!=null) {
      	console.log(FBRT.auth().currentUser.uid);
        //Events.getUser();
        var user=FBRT.database().ref('Usuarios/'+FBRT.auth().currentUser.uid).once('value',function(snapshot){
          dataUser.setUser(snapshot.exportVal());
          /*var storageRef=FBRT.storage().ref();*/
          FBRT.database().ref('Posts/'+snapshot.child('id').val()).on('child_added',function(data){
            //console.log(snapshot.val());
            posts.setPost(data.exportVal());  
          });
          FBRT.database().ref('Posts/'+snapshot.child('id').val()).on('child_changed',function(data){

            //console.log(snapshot.val());
            posts.setPost(data.exportVal());  
          });
          FBRT.database().ref('Posts/'+snapshot.child('id').val()).on('child_moved',function(data){

            //console.log(snapshot.val());
            posts.setPost(data.exportVal());  
          });
          
        });
        }
      },10);
});
})
.factory('posts', function(){
  var array=[];
  var Obj={
    getPost:'',
    setPost:function(data){
      array.push(data);
      Obj.getPost=array;
    }
  }
  return Obj;
})
.factory('dataUser', function(){
  var array=[];
  var Obj={
    getUser:'',
    setUser:function(data){
      array.push(data);
      Obj.getUser=array;
    }
  }
  return Obj;
})
  .factory('validacion',function(FBRT, $timeout){
    var user={
      result:'',
      comprobar:function(){
        var uid=FBRT.auth().currentUser;
        user.result=(uid==null)?true:false;
      }
    }
    return user;
  })
  .controller('MainCtrl', function ($scope, $mdDialog, $timeout, Events, dataUser, posts, $location) {
      $scope.tabs=[
        {tab:'Inicio', icon:'', uri:''},
        {tab:'Quines Somos', icon:'', uri:''},
        {tab:'', icon:'', uri:''},
        {tab:'', icon:'', uri:''},
        ];
      $scope.collection=[
      {uid:'sdfwe32', id:'0000000001', name:'Porton Gaucho', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'sdf3456', id:'0000000002', name:'El Rey del  Mar', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'564gfgy', id:'0000000003', name:'Manitas Piuranas', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'fg54dfg', id:'0000000004', name:'Palmira', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'hjkdfg5', id:'0000000005', name:'Napos', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'fdas456', id:'0000000006', name:'Mirko', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'ghfgw57', id:'0000000007', name:'Villar', image:'images/font.jpg', type:'Alquiler', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'gfhsd44', id:'0000000008', name:'otros', image:'images/font.jpg', type:'Alquiler', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'aad4557', id:'0000000009', name:'client', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'ghj4532', id:'0000000010', name:'client', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'iokjk98', id:'0000000011', name:'client', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'vbmgff7', id:'0000000012', name:'client', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'df655df', id:'0000000013', name:'client', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      {uid:'xczxc56', id:'0000000014', name:'client', image:'images/font.jpg', type:'Restaurant', description:'Aqui encontraras las mejores razones para venir y degustar las mejores platillos a la carta en ocasiones especiales y en familia'},
      ];
      $scope.details=function(option){
        $location.path('/details/'+option.type+'/'+option.name+'/'+option.uid);
      }
      $scope.login = function(ev) {
    $mdDialog.show({
      controller: 'MainCtrl',
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen 
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };

  $scope.loginOpcion=function(attr){
  	if (attr=='login') {
  		$scope.Sign={'display':'block'};
  		$scope.Create={'display':'none'};
  		$scope.loginOpcion.state=false;
  	}else if(attr=='createuser'){
  		$scope.Sign={'display':'none'};
  		$scope.Create={'display':'block'};
  		$scope.loginOpcion.state=true;
  	}
  }

  $scope.SignIn=function(){
  	Events.SignIn($scope.user);
  }
  $scope.CreateUser=function(){
  	Events.CreateUserAndPosts($scope.user, null);
  }



      var imagePath = '';
    $scope.posts = [];
 

$timeout(function(){
    $scope.posts=posts.getPost;
    $scope.user=dataUser.getUser;
  },6000);

  });
