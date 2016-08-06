// Load required packages
var Bear = require('../models/bear');

// Create endpoint /api/bears for POSTS
exports.postBears = function(req, res) {
  // Create a new instance of the Bear model
  var bear = new Bear();

  // Set the bear properties that came from the POST data
  bear.name = req.body.name;
  bear.type = req.body.type;
  bear.quantity = req.body.quantity;

  // Save the bear and check for errors
  bear.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Bear added!', data: bear });
  });
};

// Create endpoint /api/bears for GET
exports.getBears = function(req, res) {
  // Use the Bear model to find all bears
  Bear.find(function(err, bears) {
    if (err)
      res.send(err);

    res.json(bears);
  });
};

// Create endpoint /api/bears/:bear_id for GET
exports.getBear = function(req, res) {
  // Use the Bear model to find a specific bear
  Bear.findById(req.params.bear_id, function(err, bear) {
    if (err)
      res.send(err);

    res.json(bear);
  });
};

// Create endpoint /api/bears/:bear_id for PUT
exports.putBear = function(req, res) {
  // Use the Bear model to find a specific bear
  Bear.findById(req.params.bear_id, function(err, bear) {
    if (err)
      res.send(err);

    // Update the existing bear quantity
    bear.quantity = req.body.quantity;

    // Save the bear and check for errors
    bear.save(function(err) {
      if (err)
        res.send(err);

      res.json(bear);
    });
  });
};

// Create endpoint /api/bears/:bear_id for DELETE
exports.deleteBear = function(req, res) {
  // Use the Bear model to find a specific bear and remove it
  Bear.findByIdAndRemove(req.params.bear_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Bear removed!' });
  });
};