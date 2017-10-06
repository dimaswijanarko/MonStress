app.controller('ImageCtrl', function($scope, $state, $ionicLoading, $ionicModal, Localstorage, Popup, Conf, data) {

	$ionicLoading.hide();
	
	$scope.data = data.image;
	
});