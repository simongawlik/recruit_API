var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AthleteSchema = new Schema({
	name: String,
});

module.exports = mongoose.model('Athlete', AthleteSchema);