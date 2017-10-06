app.factory('Popup', function($ionicPopup, Conf) {
  return {
  
    Alert: function(mess) {
      var promise = $ionicPopup.alert({
             title: Conf.header,
             template: mess,
             buttons: [
               {
                 text: 'OK',
                 type: 'button-positive'
               }
              ]  
           });
        
      return promise;
    },

    Confirm: function(msg) {
        var confirm = $ionicPopup.confirm({
           title: Conf.header,
           template: msg
        });

        return confirm;
    }

  };
});