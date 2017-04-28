var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
//suppose to create a fetcher database and connect to it
mongoose.connect('mongodb://localhost/fetcher');
mongoose.Promise = global.Promise;

var repoSchema = mongoose.Schema({
    GithubRepo_Id: { type: Number, unique: true, dropDups: true },
    Login: String,
    Name: String,
    Url: String,
    Description: String
});

repoSchema.plugin(uniqueValidator);

var Repo = mongoose.model('Repo', repoSchema);
module.exports = Repo;