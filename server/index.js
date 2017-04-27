var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var request = require('request');
//for the config file, it will run everything and return any console.logs 
var config = require('../env/config');

var userAgent = 'ihe123';
var key = config.github.oauthToken;
var info;
var numRepos;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  //this post handles the post that are coming from the client/the front end 
  //ajax call
  //the request for data from the github server happens in here where 
  //the data passed in from the client is accessible
  var options = {
    //in order to use variables, make sure to concatenate to string if url is in string
    url: 'https://api.github.com/users/' + userAgent + '/repos?access_token=' + key,
    //to grab the URL, look at 'how to access token to access API'
    headers: {
      'User-Agent':userAgent
    }
  }

  var callback = function(error, response, body) {
    if (error) {
      throw error;
    } else {
      info = JSON.parse(body);
      numRepos = info.length;
      //this res.send sends the info back to the client and if the client succesfully receives it,
      //the ajax success portion should be able to access it through the 'data' parameter that's passed into 
      //the success function
      //seems like it has to be res.status.. can't be response
      res.status(200).send(info);
      //either use this number to somehow render on the page
      //or replace the repo array from the index.jsx to info..
    }
  }  
  request(options, callback);
  // TODO
});



app.get('/repos', function (req, res) {
  
  // TODO
});



var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

