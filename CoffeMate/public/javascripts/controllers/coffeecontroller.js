var app = angular.module('CoffeeMateWebApp');

app.controller('coffeeController', ['$scope', '$location', '$http', function($scope, $location, $http) {
    
    $scope.formData = {};

    $scope.message = 'Coffess Page';
    //$scope.amount = 1000;
    //$scope.options = [{ name: "PayPal", id: 0 }, { name: "Direct", id: 1 }];
    //$scope.formData.paymentOptions = $scope.options[0];

    //Reset our formData fields
    $scope.formData.coffeeName = '';
    $scope.formData.coffeeShop = '';
    $scope.formData.coffeePrice = 0;

    $scope.addCoffee = function(){
       $http.post('/coffees', $scope.formData)
            .success(function(data) {
                $scope.coffees = data;
                $location.path('/coffees');
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
              });
            };
  }

  ]);
