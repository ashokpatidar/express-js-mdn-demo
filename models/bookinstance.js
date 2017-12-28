var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
	book:{type:Schema.ObjectId, ref:'Book', required: true},
	imprint:{type:String, required:true},
	status:{type:String, required:true, enum:['Available','Maintainance', 'Loaned', 'Reserved']},
	due_back:{type:Date, default:Date.now}
});

BookInstanceSchema.virtual('due_back_formatted')
.get(function(){
	return moment(this.due_back).format('MMMM Do, YYYY');
});

// virtual for bookinstance url
BookInstanceSchema.virtual('url')
.get(function(){
	return '/catalog/bookinstance/'+this._id;
});

// Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);