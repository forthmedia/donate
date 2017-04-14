var donateApp = angular.module("donateApp", ['ngCookies']);

donateApp.controller('donateController', ['$scope', '$window', '$cookies', function($scope, $window, $cookies) {

    $scope.state = {
       remaining: 165,
       donors: 33,
       given: 0,
       gave: false
    };

    $scope.state.bar = ((600 - $scope.state.remaining) / 2) - 2;

    $scope.state.amount = $window.localStorage.getItem("amount") || 50;
    $scope.state.saved = $window.localStorage.getItem("saved") || false;

    if ($scope.state.saved) {
        $scope.state.given = parseInt($cookies.get('given')) || 0;
        $scope.state.remaining -= $scope.state.given;
        $scope.state.donors++;
        $scope.state.gave = true;
    }

    if (! $scope.state.saved) {
        $scope.state.save = "Save";
    } else {
        $scope.state.save = "Reset";
    }

    $scope.give = function() {
        //input validation
        if (($scope.state.amount < 0) || (isNaN($scope.state.amount))) {
            $scope.state.amount = 50;
            return;
        }
        if (! $scope.state.gave) {
            $scope.state.donors++;
            $scope.state.gave = true;
        }
        if ($scope.state.remaining > 0) {
            $scope.state.remaining -= $scope.state.amount;
            if ($scope.state.remaining < 0) $scope.state.remaining = 0;
            $scope.state.bar = ((600 - $scope.state.remaining) / 2) - 2;
            $scope.state.given += parseInt($scope.state.amount);
            $cookies.put('given', $scope.state.given);
            $scope.showThankyou = true;
        }
    }

    $scope.save = function() {
        $scope.state.saved = ! $scope.state.saved;
        if ($scope.state.saved) {
            $window.localStorage.setItem('amount', $scope.state.amount);
            $window.localStorage.setItem('saved', true);
            $cookies.put('given', $scope.state.given);
            $scope.state.save = "Reset";
        } else {
            $scope.reset();
        }
    }

    $scope.showWhy = false;
    $scope.toggleWhy = function() {
        $scope.showWhy = ! $scope.showWhy;
    }

    $scope.showThankyou = false;
    $scope.toggleThankyou = function() {
        $scope.showThankyou = ! $scope.showThankyou;
    }

    $scope.reset = function() {
        console.log("reset component");
         $scope.state = {
            remaining: 165,
            donors: 33,
            gave: false,
            amount: 50,
            given: 0,
            save: "Save"
        };
        $scope.state.bar = ((600 - $scope.state.remaining) / 2) - 2;
        $cookies.remove('given');
        $window.localStorage.removeItem('amount');
        $window.localStorage.removeItem('saved');
    }

}]);

donateApp.directive("donateUx", function() {
    return {
        restrict : "E",
        templateUrl : "donate.html"
    };
});
