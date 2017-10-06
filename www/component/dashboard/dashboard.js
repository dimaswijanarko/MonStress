app.controller('DashboardCtrl', function($scope, $state, $ionicLoading, Localstorage, Popup, Conf, localdata) {

  $ionicLoading.hide();

  $scope.data = localdata;

  $scope.msg = Conf;

  $scope.isCritical = false;

  $scope.checking = function(param) {

		$scope.val = {};

		if(param <= 14){

			$scope.val.level = $scope.msg.stressLevel0;
			$scope.val.desc  = null;
			$scope.val.img = $scope.msg.stressImg0;
			
			return $scope.val;

		} else if((param => 15) && (param <= 18)) {

			$scope.val.level = $scope.msg.stressLevel1;
			$scope.val.desc  = $scope.msg.stressSuggest1a;
			$scope.val.img = $scope.msg.stressImg1;

			return $scope.val;

		} else if((param => 19) && (param <= 25)){

			$scope.val.level = $scope.msg.stressLevel2;
			$scope.val.desc  = $scope.msg.stressSuggest1a;
			$scope.val.img = $scope.msg.stressImg1;

			return $scope.val;

		} else if((param => 26) && (param <= 33)){

			$scope.val.level = $scope.msg.stressLevel3;
			$scope.val.desc  = $scope.msg.stressSuggest2a;
			$scope.val.img = $scope.msg.stressImg2;

			return $scope.val;

		} else if(param => 34){

			$scope.val.level = $scope.msg.stressLevel4;
			$scope.val.desc  = $scope.msg.stressSuggest2a;
			$scope.val.img = $scope.msg.stressImg2;

			return $scope.val;

		}
  };

    $scope.desc = $scope.checking($scope.data.finalAnswer);

    if(($scope.data.stressLevel ==='Stres Berat') || ($scope.data.stressLevel ==='Stres Sangat Berat')){
    	$scope.isCritical = true;
    }

});