var app = angular.module('CoffeeMateWebApp');
app.controller('updateCoffee', ['$route', '$scope', '$http','$routeParams', '$location', function($route, $scope, $http ,$routeParams, $location ) {
// create a message to display in our view
    $scope.message = 'Update a Coffee';
    //$scope.coffee.id = $routeParams.id;
    $scope.setStar = function(num){

        $scope.coffee.rating = num;
        console.log("star clicked " + $scope.coffee.rating);
    };
    $scope.favourite = function(){
        console.log("you clicked the star");
        if($scope.coffee.favourite == true)
            $scope.coffee.favourite = false;
        else
            $scope.coffee.favourite = true;
        console.log($scope.coffee.favourite);
// $route.reload();


    };

    function findOne(id) {
        $http.get('/coffees/'+id)
            .success(function (data) {
                $scope.coffee = data;

                $scope.coffee._id = data[0]._id;
                $scope.coffee.coffeName = data[0].coffeName;
                $scope.coffee.coffeeShop = data[0].coffeeShop;
                $scope.coffee.coffePrice = data[0].coffePrice;
                $scope.coffee.favorite = data[0].favorite;
                $scope.tempfavourite = $scope.coffee.favorite;
                $scope.coffee.rating = data[0].rating;

                return $scope.coffee;

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

    }

    var id  = ($routeParams.id);

    console.log(id + "id is shown");
    var coffee = findOne(id);
    console.log(coffee + " var");
    console.log($scope.coffee + " scope");


    $scope.isFavourite = function(){
        console.log($scope.coffee);
        return $scope.coffee.favorite;
    }
    $scope.favourite = function(){
        console.log("you clicked the star");
        if($scope.coffee.favorite == true)
            $scope.coffee.favorite = false;
        else
            $scope.coffee.favorite = true;
        console.log($scope.coffee.favorite);
        // $route.reload();


    }



    $scope.editCoffee = function(id){
        console.log("with[0] "+ $scope.coffee[0].price   +    " without "+ $scope.coffee.coffePrice);
        $scope.coffee[0].coffeName = $scope.coffee.coffeName;
        $scope.coffee[0].coffeeShop = $scope.coffee.coffeeShop;
        $scope.coffee[0].coffePrice = $scope.coffee.coffePrice;
        $scope.coffee[0].favorite = $scope.coffee.favorite;
        $scope.coffee[0].rating = $scope.coffee.rating;



        $http.put('/coffees/'+$routeParams.id, $scope.coffee[0])
            .success(function(data){
                console.log(data);

                $location.path('/coffees');

            })
            .error(function(data){
                console.log('Error' + data);
            });
    }


}

]);
