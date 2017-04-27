var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  // Server: String,
  // Date: Date,
  // Content-Type: String,
  // Connection: String,
  // Status: Mixed, //not sure about this one
  // ETag: String,
  // X-GitHub-Media-Type: String,
  // X-RateLimit-Remaining: Number,
  // X-RateLimit-Reset: Number,
  // Content-Length: Number,
  // Cache-Control: 
  // X-Content-Type-Options: String
  // TODO: your schema here!
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;