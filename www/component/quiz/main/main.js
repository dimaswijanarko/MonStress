app.controller('QuizMainCtrl', function($scope, $state, $ionicLoading, $ionicModal, Localstorage, Popup, Conf) {

	$ionicLoading.hide();
	
	$scope.undercons = function(){
		Popup.Alert(Conf.underCons);
	}
	
});