var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var AuthorSchema = new Schema(
		{
			first_name:{type:String, required: true, max:100},
			family_name:{type:String, required:true, max:100},
			date_of_birth:{type:Date},
			date_of_death:{type:Date}
		}
	);

// virtual for author full name
AuthorSchema.virtual('name')
.get(function(){
	return this.family_name+", "+this.first_name;
});

AuthorSchema.virtual('date_of_birth_formatted')
.get(function(){
	return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

AuthorSchema.virtual('date_of_death_formatted')
.get(function(){
	return this.date_of_death ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});




// virtual for authos url
AuthorSchema.virtual('url')
.get(function(){
	return '/catalog/author/'+this._id;
});

// Export Model
module.exports = mongoose.model('Author', AuthorSchema);