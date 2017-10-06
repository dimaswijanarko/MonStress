app.service("$history", function($state, $rootScope, $window , $filter, Localstorage, Popup) {

  var history = [];
  var except = ['blank',];

  angular.extend(this, {
    push: function(state, params) {

      var found = $filter('filter')(except, state.name, true);

      if(found.length !== 0){

        //apps.log('ada');

      } else {

        var founded = $filter('filter')(history, state.name, true);

        if(founded.length !== 0){

        } else {

           history.push({ state: state.name, params: params });

        }

       

      }

      
    },
    all: function() {
      return history;
    },
    go: function(step) {
      

      var prev = this.previous(step);

      if(step ===undefined){
      
        history.splice(history.indexOf(prev),1);
      
      } else {

        history.splice(history.indexOf(prev),step);
      } 

      $rootScope.back = true;


      if(prev.params.type === 'first'){

        this.clear();

        history = [];

        $state.go('dashboard');

      } else {

        return $state.go(prev.state, prev.params);

      }      

    },
    previous: function(step) {
      var result;

      if(step ===undefined){
      
        result = history[history.length - Math.abs(1)];
      
      } else {

        result = history[history.length - Math.abs(step)];
      } 
      return result;
    },
    back: function(step) {
      return this.go(step);
    },
    clear: function(){
      history = [];
    }
  });

});