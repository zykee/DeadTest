const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	id:{type:Number},
	alt:{type:String},
	year:{type:String},
	title:{type:String},
	rating:{type:Number},
	original_title:{type:String},
	director:{type:String},
	casts:{type:String},
	genres:{type:String},
	image:{type:String}
});

module.exports = mongoose.model('Movie', MovieSchema);