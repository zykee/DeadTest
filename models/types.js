const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
	type:{type:String}
});

module.exports = mongoose.model('Type', TypeSchema);