app.factory('Service', function($http) {

  return {
    GetList: function(url) {

      var urls = "";
        if(ionic.Platform.isAndroid()){
            urls = "/android_asset/www/";
        }

        // var urls="/";

      var promise = $http.get(urls+'data/'+url)
      .then(function successCallback(response) {
        return response;
      }, function errorCallback(response) {

        return response;
      });
        
      return promise;
    },
      
    
    
      
      
  };
});