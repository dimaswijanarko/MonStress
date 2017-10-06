app.directive('back', ['$window','$history', function($window, $history) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $history.back();
                });
            }
        };
    }]);