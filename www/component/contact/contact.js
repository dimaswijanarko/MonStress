app.controller('ContactCtrl', function($scope, $state, $ionicLoading, Localstorage, Popup, Conf, data) {


	$ionicLoading.hide();

	$scope.data = data;

	$scope.msg = Conf;
	
});