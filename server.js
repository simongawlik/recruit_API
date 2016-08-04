// BASE SETUP
// ====================================================================

// call the packages we need
var express = require('express');		// call express
var app = express();					// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recruit_API'); 	// connect to database
var Bear = require('./app/models/bear');
var Athlete = require('./app/models/athlete');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;	// set our port

// ROUTES FOR OUR API
// ====================================================================
var router = express.Router();			// get an instance of express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); 	// make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /bears
// --------------------------------------------------------------------
var bearsRoute = router.route('/bears');
	
// create a bear (accessed at POST http://localhost:8080/api/bears)
bearsRoute.post(function(req, res) {

	var bear = new Bear();		// create a new instance of the Bear model
	bear.name = req.body.name;	// set the bear's name (comes from the request)
	bear.type = req.body.type;
	bear.quantity = req.body.quantity;

	// save the bear and check for errors
	bear.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Bear created!' });
	});
});

// get all the bears (accessed at GET http://localhost:8080/api/bears)
bearsRoute.get(function(req, res) {
	Bear.find(function(err, bears) {
		if (err)
			res.send(err);

		res.json(bears);
	});
});

// on routes that end in /bears/:bear_id
// --------------------------------------------------------------------
var bearRoute = router.route('/bears/:bear_id')

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
bearRoute.get(function(req, res) {
	Bear.findById(req.params.bear_id, function(err, bear) {
		if (err)
			res.send(err);
			
		res.json(bear);
	});
});

// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
bearRoute.put(function(req, res) {

	// use our bear model to find the bear we want
	Bear.findById(req.params.bear_id, function(err, bear) {
		if (err)
			res.send(err);
			
		bear.quantity = req.body.quantity;	// update the bears info

		// save the bear
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json(bear);
		});
	});
});

	// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
bearRoute.delete(function(req, res) {
	Bear.findByIdAndRemove(req.params.bear_id, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Successfully deleted' });
	});
});


// on routes that end in /athletes
// --------------------------------------------------------------------
router.route('/athletes')
	
	// create an athlete bear (accessed at POST http://localhost:8080/api/athletes)
	.post(function(req, res) {

		var athlete = new Athlete();		// create a new instance of the Athlete model
		athlete.name = req.body.name;	// set the athlete's name (comes from the request)

		// save the bear and check for errors
		athlete.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Athlete created!' });
		});
	})

	// get all the athletes (accessed at GET http://localhost:8080/api/athletes)
	.get(function(req, res) {
		Athlete.find(function(err, athletes) {
			if (err)
				res.send(err);

			res.json(athletes);
		});
	});

// on routes that end in /athletes/:athlete_id
// --------------------------------------------------------------------
router.route('/athletes/:athlete_id')

	// get the athlete with that id (accessed at GET http://localhost:8080/api/athletes/:athlete_id)
	.get(function(req, res) {
		Athlete.findById(req.params.athlete_id, function(err, athlete) {
			if (err)
				res.send(err);
			
			res.json(athlete);
		});
	})

	// update the athlete with this id (accessed at PUT http://localhost:8080/api/athletes/:athlete_id)
	.put(function(req, res) {

		// use our athlete model to find the athlete we want
		Athlete.findById(req.params.athlete_id, function(err, athlete) {
			if (err)
				res.send(err);
			
			athlete.name = req.body.name;	// update the athlete's info

			// save the athlete
			athlete.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Athlete updated!' });
			});
		});
	})

	// delete the athlete with this id (accessed at DELETE http://localhost:8080/api/athlete/:athlete_id)
	.delete(function(req, res) {
		Athlete.remove({
			_id: req.params.athlete_id
		}, function(err, athlete) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// REGISTER OUR ROUTES ------------------------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// ====================================================================
app.listen(port);
console.log('Magic happens on port ' + port);