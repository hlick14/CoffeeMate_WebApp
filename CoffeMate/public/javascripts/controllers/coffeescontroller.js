var app = angular.module('CoffeeMateWebApp');

app.controller('coffeesController', ['$scope','$http','$location','$routeParams', function($scope, $http, $location, $routeParams) {
    // create a message to display in our view
    $scope.message = 'Coffee Page!';

    findAll();
    //findOne();
    $scope.edit =function(id){
        $location.path('/edit/'+id);

    };

    function findAll() {
        $http.get('/coffees')
            .success(function (data) {
                $scope.coffees = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }




    $scope.deleteCoffee = function(id) {
        if (confirm("Are you sure you want to delete ?")) {
            console.log('Deleting id : ' + id);
            $http.delete('/coffees/' + id)
                .success(function(data) {
                    $scope.coffees = data;
                    console.log(data);
                    findAll();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };

    $scope.updateCoffee = function (id) {
        $location.path('/updatecoffee/'+id);
        //console.log(id);
    }







}
]);
