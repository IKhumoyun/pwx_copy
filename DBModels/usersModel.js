const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    userNameField: {type: String, required: true},
    passwordField: {type: String, required: true},
    comments: [{type: String}],
    validationField: String
});

var User = mongoose.model('user', userSchema);

module.exports = User;