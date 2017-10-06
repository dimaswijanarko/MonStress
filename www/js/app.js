// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('MonStress', [
  'ionic',
  'ngCordova',
  'ngMessages', 
  'lokijs'
]);

app.run(function($ionicPlatform, $rootScope, $state, $history, Localstorage, Popup, Conf) {

    $rootScope.back = false;
    
    Localstorage.InitDB();
    
    
    Localstorage.getAllData().then(function(resp){
    
          if (resp.length == 0){
          
                $rootScope.LocalData = null;

                Popup.Alert(Conf.disclaimer).then(function (res) {

                  var data = {};
                  data.isActived = true;
                  data.activedDate = new Date().toISOString().split('T')[0];
                  data.temp = new Date();
                  data.temp.setDate(data.temp.getDate() + 30);
                  data.expiredDate = new Date(data.temp).toISOString().split('T')[0];

                  delete data.temp;

                  Localstorage.addData(data)
                  .then(function(resp){

                    Localstorage.findData().then(function(respo){

                      $state.go('form');

                    });

                  });

                });

          } else {

            var today = new Date().toISOString().split('T')[0];

            if(resp[0].expiredDate === today){

              resp[0].isActived = false;

              Localstorage.updateData(resp[0]).then(function(yes){

                Popup.Alert(Conf.expiredDate).then(function(res){

                    navigator.app.exitApp();

                })

              });
            
            } else {

              if(resp[0].isActived){

                $state.go('dashboard');

              } else {


                Popup.Alert(Conf.expiredDate).then(function(res){

                    navigator.app.exitApp();

                })

              }

            }

          }
            
    });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    //codePush.sync(null, { updateDialog: { updateTitle: "An update is available!" } });

    $rootScope.$on("$stateChangeSuccess", function(event, to, toParams, from, fromParams) {

      if ($rootScope.back){
        
        $rootScope.back = false;

      } else if (!from.abstract) {
        
        $history.push(from, fromParams);
      
      }

    });

    $ionicPlatform.registerBackButtonAction(function (event) {
      if(($state.current.name=="dashboard") || ($state.current.name=="form")){
        navigator.app.exitApp();
      }
      else {
        $history.back();
      }
    }, 100);



  });
})

app.config(function($ionicConfigProvider) {

  $ionicConfigProvider.form.checkbox("circle");

  $ionicConfigProvider.navBar.alignTitle('center');

})
