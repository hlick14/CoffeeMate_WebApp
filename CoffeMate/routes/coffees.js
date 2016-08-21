var coffees = require('../models/coffees');
var mongoose = require('mongoose');
var express = require('express');
var Coffee = require('../models/coffees');
var router = express.Router();





mongoose.connect('mongodb://localhost:27017/coffeematedb');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});


function getByValue(arr, id) {

  var result  = arr.filter(function(o){return o.id == id;} );

  return result ? result[0] : null; // or undefined

}
 
router.home = function(req, res) {
  //route to handle all angular requests
  res.sendFile('../public/index.ejs'); // load our public/index.ejs file
}

router.findAll = function(req, res) {
  // Return a JSON representation of our list
    Coffee.find(function(err, coffees) {
        if (err)
            res.send(err);

        res.json(coffees);
    });
}
router.findOne = function(req, res) {

    Coffee.find({ "_id" : req.params.id },function(err, coffee) {
        if (err)
            res.json({ message: 'Coffee NOT Found!', errmsg : err } );
        else
            res.json(coffee);
    });
}

router.addCoffee = function(req, res) {

    var coffee = new Coffee();
    coffee.coffeeShop = req.body.coffeeShop;
    coffee.coffeName = req.body.coffeName;
    coffee.coffePrice = req.body.coffePrice;
    coffee.rating = req.body.rating;
    console.log('Adding coffee: ' + JSON.stringify(coffee));

    // Save the coffee and check for errors
    coffee.save(function(err) {
        if (err)
            res.send(err);

        res.json({ message: 'Coffee Added!', data: coffee });
    });


}

router.deleteCoffee = function(req, res) {

    Coffee.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.send(err);
        else
            res.json({ message: 'Coffee Deleted!', data: Coffee});
    });
}


router.updateCoffee = function(req, res) {


    Coffee.findById(req.params.id, function(err,coffee) {
        if (err)
            res.send(err);
        else {

            coffee.favorite = req.body.favorite;
            coffee.rating = req.body.rating;
            coffee.coffeeShop = req.body.coffeeShop;
            coffee.coffeName = req.body.coffeName;
            coffee.coffePrice = req.body.coffePrice;
            var id = req.params.id;

            Coffee.findOneAndUpdate({_id:id}, {$set : {"coffeName": coffee.coffeName, "coffeeShop": coffee.coffeeShop, "coffePrice": coffee.coffePrice, "favorite" : coffee.favorite, "rating": coffee.rating }}, {upsert: true}, function(err, coffee){
                if(err)
                    res.send(err)
                else
                    res.send("successfully saved");


            });


        };
    });
}

module.exports = router;
