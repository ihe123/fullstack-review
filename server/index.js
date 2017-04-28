var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var request = require('request');
//for the config file, it will run everything and return any console.logs 
var config = require('../env/config');
//./ is current directory

var Repo = require('../database/index.js');


var port = 1128;

var userAgent = 'ihe123';
var key = config.github.oauthToken;
var info;
var numRepos;


// app.post('/abc', function(req, res) {
//   res.send(req.body);
// })


app.post('/repos/import', function (req, res) {
  //this post handles the post that are coming from the client/the front end 
  //ajax call
  //the request for data from the github server happens in here where 
  //the data passed in from the client is accessible
  var options = {
    //in order to use variables, make sure to concatenate to string if url is in string
    url: 'https://api.github.com/users/' + req.body.data + '/repos?access_token=' + key,
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

      var repoRecords = [];
      info.forEach(function(record) {
        var newRepo = {};
        newRepo.Login = record.full_name.split('/')[0];
        newRepo.Name = record.name;
        newRepo.GithubRepo_Id = record.id;
        newRepo.Url = record.html_url;
        newRepo.Description = record.description;

        repoRecords.push(newRepo);
      });

      Repo.collection.insert(repoRecords, function(error, docs) {
        if(error) {
          console.log(error);
        } else {
          console.log('docs', docs);
        }

        Repo
        .find({
          Login : req.body.data
        })
        .limit(25)
        .exec(function(error, data) {
          res.send(data);
        });
      });
      // res.send(body);
    }
    // Repo.insertMany(repoRecords);
    // info.forEach(function(record) {
    //   var repo = new Repo ({
    //     Name: record.name,
    //     GithubRepo_Id: record.id,
    //     Url: record.html_url,
    //     Description: record.description
    //   })
    //     //this stores all the tables into the fetcher database
    //   repo.save(function(err, data) {
    //     if(err) {
    //      throw err;
    //     } else {
    //       console.log('saved repo', data)
    //     }
    //   });

    //check your notebook to see the commands for checking whether or not the table
    //exists
        
    //how do I grab the name, url, and description for each repo from the database
    //and then retrieve it from the client side so i can display the corresponding data 

    //this res.send sends the info back to the client and if the client succesfully receives it,
    //the ajax success portion should be able to access it through the 'data' parameter that's passed into 
    //the success function
    //seems like it has to be res.status.. can't be response
    //either use this number to somehow render on the page
    //or replace the repo array from the index.jsx to info..
  }

  request(options, callback);

  //need request module to manipulate client post data
  // TODO
});

app.get('/repos', function (req, res) {
  var resultArray = [];
  var stream = Repo.find().stream;
  stream.on('data', function(doc) {
    resultArray.push(doc);
  })
  .on('error', function(err) {
    console.log(error);
  })
  .on('close', function() {
    res.send(resultArray);
  })
  //  Repo
  // .find({})
  // .limit(25)
  // .exec(function(error, data) {
  //   res.end(data);
  // });
});

    // res.end or res.send

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

