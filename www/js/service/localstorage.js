app.factory('Localstorage', function($q, Loki, $ionicPlatform) {
  var _db;
  var _storage;
  var failed = 500;
  var success = 200;    
    
  return {  
    InitDB: function() {    
      var fsAdapter = new LokiCordovaFSAdapter({"prefix": "MonStress"});    
      _db = new Loki('MonStressDB',
            {
                autosave: true,
                autosaveInterval: 1000, // 1 second
                adapter: fsAdapter // remark untuk run di browser
            });
    },
    
    getAllData: function() {
        var d = $q.defer();
        $ionicPlatform.ready().then(function(){
          var options = {}; 
            _db.loadDatabase(options, function () {
                    _storage = _db.getCollection('MonStress');

                    if (!_storage) {
                        _storage = _db.addCollection('MonStress');
                    }

                    d.resolve(_storage.data);
                });
            })        

        return d.promise;
                  
    },

    findData: function() { 
      return $q(function (resolve, reject) {
          _storage = _db.getCollection('MonStress');
          
          if (!_storage) {
                resolve(failed);
          } else {
              
                resolve(_storage.data);
          }
      })
    },

    destroyData: function(data){
      return $q(function (resolve, reject) {
          _storage = _db.deleteDatabase('MonStressDB');
          
          if (!_storage) {
                reject(failed);
          } else {
                resolve(_storage);
          }
      }) 
      
    }, 
      
    addData: function(data) { 
      return $q(function (resolve, reject) {
          _storage = _storage.insert(data);
          if (!_storage) {
                reject(failed);
          } else {
                resolve(success);
          }
      })
    },
    
    updateData: function(data) {
      return $q(function (resolve, reject) {
          _storage = _storage.update(data);

          if (!_storage) {
                reject(failed);
          } else {
                resolve(success);
          }
      })
     
    },
    
    deleteData: function(data){
      return $q(function (resolve, reject) {
          _storage = _storage.remove(data);

          if (!_storage) {
                reject(failed);
          } else {
                resolve(success);
          }
      }) 
      
    }
      
  };
});