const express = require('express');
let app = express();
const github = require('../helpers/github')
const bodyParser = require('body-parser');
const db = require('../database/index.js')

app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  
  console.log('in post request!');
  var username = req.body.username; // get username!
  console.log(username);
  
  github.getReposByUsername(username, (err, data) => {
  	if (err) {
  		res.status(404).send('error in getting repos from github!');
  	} else {

  		var saved = 0;

  		data.forEach((repo) => {
  			db.save(repo, (error, result) => {
  				if (error) {
  					res.status(404).send('error saving to db');
  				} else {
  					console.log(result);
  					saved++;
  					if (saved === data.length) {
  						res.send('success saving ALL repos!');
  					}
  				}
  			});
  		});

  	}
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  db.get((error, result) => {
  	if (error) {
  		res.status(404).send('error getting from db');
  	} else {
  		console.log('RESULT IS');
  		console.log(result);
  		res.send(result);
  	}
  })

  // res.send('sending back get request');
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

