var app = angular.module('CoffeeMateWebApp', ['ngRoute','ui.bootstrap', 'ngAnimate']);

app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.ejs',
                controller  : 'mainController'
            })

             // route for the coffee page
            .when('/coffee', {
                templateUrl : 'pages/coffee.ejs',
                controller  : 'coffeeController'
            })

             // route for the coffees page
            .when('/coffees', {
                templateUrl : 'pages/coffees.ejs',
                controller  : 'coffeesController'
            })
            .when('/updatecoffee/:id',{
                templateUrl: 'pages/update.ejs',
                controller : 'updateCoffee'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.ejs',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.ejs',
                controller  : 'contactController'
            });
    });


  
  


