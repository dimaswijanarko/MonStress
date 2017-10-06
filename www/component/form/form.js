app.controller('FormCtrl', function($scope, $state, $ionicLoading, Localstorage, Popup, Conf) {

  $scope.data = {};

  $scope.doSubmit = function(userForm){

	    if(!userForm.$valid){

	    } else {

	    	Popup.Confirm(Conf.submitQuest)
	    	.then(function(res){

	    		if(res){

	    			//$scope.data.isActived = true;
	    			//$scope.data.activedDate = new Date();
	    			//$scope.data.expiredDate = new Date();
	    			//$scope.data.expiredDate.setDate($scope.data.expiredDate.getDate() + 30);

	    			$ionicLoading.show();

	    			Localstorage.addData($scope.data)
	    			.then(function(resp){

	    				$ionicLoading.hide();
	    				$state.go('quiz',{type:'first'});
	    			});
	    		
	    		} else {

	    			console.log('no');
	    		}
	    	})

	    }
  }

});