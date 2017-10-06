app.controller('QuizCtrl', function($scope, $state, $stateParams, $ionicLoading, Localstorage, Popup, Conf, data, localdata) {

	$scope.isStart = true;
	$scope.isProgress = false;
	$scope.isResult = false;

	$scope.status = $stateParams.type;

	$scope.data = {};
	$scope.desc = {};

	if($stateParams.type ==='first'){
		$scope.data = localdata;
	}

	$scope.i = 0;
	$scope.quest = data[$scope.i];
	$scope.answer = [];

	$scope.msg = Conf;

	$scope.answq = null;

	$scope.start = function(){
		$scope.isStart = false;
		$scope.isProgress = true;
	};

	$scope.answerValue = [];

	for (j = 0; j < 4; j++) { 

		$scope.answerValue[j] = {};
		$scope.answerValue[j].value = j;
	   
	};

	$scope.checking = function(param) {

		$scope.val = {};

		if(param <= 14){

			$scope.val.level = $scope.msg.stressLevel0;
			$scope.val.desc  = null;
			$scope.val.img = $scope.msg.stressImg0;
			
			return $scope.val;

		} else if((param => 15) && (param <= 18)) {

			$scope.val.level = $scope.msg.stressLevel1;
			$scope.val.desc  = $scope.msg.stressSuggest1;
			$scope.val.img = $scope.msg.stressImg1;

			return $scope.val;

		} else if((param => 19) && (param <= 25)){

			$scope.val.level = $scope.msg.stressLevel2;
			$scope.val.desc  = $scope.msg.stressSuggest1;
			$scope.val.img = $scope.msg.stressImg1;

			return $scope.val;

		} else if((param => 26) && (param <= 33)){

			$scope.val.level = $scope.msg.stressLevel3;
			$scope.val.desc  = $scope.msg.stressSuggest2;
			$scope.val.img = $scope.msg.stressImg2;

			return $scope.val;

		} else if(param => 34){

			$scope.val.level = $scope.msg.stressLevel4;
			$scope.val.desc  = $scope.msg.stressSuggest2;
			$scope.val.img = $scope.msg.stressImg2;

			return $scope.val;

		}
  };

	$scope.checkCekbox = function(index, val){
		
		angular.forEach($scope.answerValue, function (value, position) {

				if (position !== index) {
						
					$scope.answerValue[position].checked = false;
					
			  	} else {

			  		if ($scope.answerValue[index].checked) {

			  			$scope.answq = $scope.answerValue[index].value;			  			

			  		} else {

			  			$scope.answq = null;

			  		}

			  	}
		});
	}

	$scope.doSubmit = function(){

		if(($scope.answq === null) || ($scope.answq === '')){

			Popup.Alert(Conf.blankQuest);

		} else {

			$scope.i ++;

			if($scope.i === (data.length)){

				$scope.data.finalAnswer = eval($scope.answer.join("+"));

				$ionicLoading.show();

				$scope.isProgress = false;

				$scope.desc = $scope.checking($scope.data.finalAnswer);

				$scope.data.stressLevel = $scope.desc.level;

				$ionicLoading.hide();

				if($stateParams.type ==='first'){

					Localstorage.updateData($scope.data)

					.then(function(res){

						console.log('yaa :: ' + res);

					})

				}

				$scope.isResult = true;


			} else {

				$scope.answer.push($scope.answq);

				$scope.answq = null;

				angular.forEach($scope.answerValue, function (value, position) {

					$scope.answerValue[position].checked = false;

				});

				$scope.quest = data[$scope.i];

			}
		}
		
	}

	$scope.checkingResult = function(){

		$ionicLoading.show();

		if($scope.data.stressLevel === 'Normal'){

			$ionicLoading.hide();

			$state.go('dashboard');

		} else if(($scope.data.stressLevel === 'Stres Sedang') || ($scope.data.stressLevel === 'Stres Ringan')){

			$state.go('content');

		} else if(($scope.data.stressLevel === 'Stres Berat') || ($scope.data.stressLevel === 'Stres Sangat Berat')){

			$state.go('contact');

		}
	}
});