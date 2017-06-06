var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;



var userSchema = new Schema({
    id: String,
    projects: []
});

var User = mongoose.model('User', userSchema);

module.exports = User;