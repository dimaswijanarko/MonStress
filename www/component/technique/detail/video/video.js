app.controller('VideoCtrl', function($scope, $state, $ionicLoading, $ionicModal, Localstorage, Popup, Conf, data) {

	$ionicLoading.hide();
	
	$scope.data = data.video;

	$scope.video = null;

	$scope.playVideo = function(src) {
		$scope.video = src;
        $scope.showModal('component/template/modal.video.html');
    }

    $scope.showModal = function(templateUrl) {
        $ionicModal.fromTemplateUrl(templateUrl, {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    }

    // Close the modal
    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.modal.remove();
        $scope.video = null;
    };
	
});