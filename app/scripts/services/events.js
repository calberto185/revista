'use strict';

/**
 * @ngdoc service
 * @name app.Events
 * @description
 * # Events
 * Factory in the app.
 */
angular.module('app')
  .factory('Events', ['FBRT', function(fb){
      function nodo(d){
        var t=d.split('').length;
        var result="";
        if (t<10) {
          for (var i = 10 - t; i >= 1; i--) {
            result=result+"0";
          }
          result=result+d;
        }else{
          result=d;
        }
        return result;
      }
    var ObjUser=[];
    var events={
      dataUser:'',
      dataplato:'',
      SignIn:function(obj){
        if (obj.email!=null && obj.password!=null) {
          if(!fb.auth().currentUser){
            fb.auth().signInWithEmailAndPassword(obj.email, obj.password)
            .then(function(onResolve){
              if (onResolve) {
                console.log("Sign-In successful.");
                events.getUser();
              }else if (onResolve.code=="auth/argument-error") {
                console.log("Usuario no registrado");
              }
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              var errorEmail = error.email;
              var errorPassword= error.password;
            });
          }else{
            fb.auth().signOut();
          }
          
        }
        },
      SignOut:function(){
        fb.auth().signOut().then(function() {
          console.log("Sign-out successful.");
        }, function(error) {
          console.log("An error happened.");
        });
        },
      CreateUserAndPosts:function(user, content){
        fb.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(function(data){
          console.log("Create user successful.");
          var reference = fb.database().ref();
            var client=reference.child('usuarios');
                  client.once("value", function(snapshot) {
                    var num = (parseInt(snapshot.numChildren())+1).toString();
                    user.id=nodo(num);
                    client.child(data.uid).set(user);
              });

        })
        .catch(function(error) {console.log("An error happened."+error);});
       },
      addPost:function(content){
      var user=fb.auth().currentUser;
        if (user!=null) {
          var identify=fb.database().ref().child('Usuarios/'+user.uid);
            identify.once("value", function(data){
              var node=data.child("id");
               var ref = fb.database().ref().child('Posts/'+node.val());
                ref.once("value", function(snapshot) {
                  var num = (parseInt(snapshot.numChildren())+1).toString();
                  var reference=ref.child(nodo(num));
                  content.id=nodo(num);
                  reference.set(content);
               });
            })
        }
        },
      getUser:function(){
        var user=fb.auth().currentUser;
          if (user!=null) {
            fb.database().ref().child('clientes/'+user.uid).on("value", function(data){
            });
          }
      },
      modifyPlato:function(item, content){
        var user=fb.auth().currentUser;
          if (user!=null) {
            fb.database().ref().child('clientes/'+user.uid).once("value", function(data){
              fb.database().ref().child('platosrestaurant/'+data.child("id_restaurant").val()+"/"+item).update(content);
              });
          }

      },
      removePlato:function(item){
        var user=fb.auth().currentUser;
          if (user!=null) {
            fb.database().ref().child('clientes/'+user.uid).once("value", function(data){
              fb.database().ref().child('platosrestaurant/'+data.child("id_restaurant").val()+"/"+item).remove();
              });
          }

      }
    };
    return events;
  }]);