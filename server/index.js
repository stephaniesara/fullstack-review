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
  		// parse data
  		// store data in database database/index.js

  		// console.log('got data from getReposByUsername!');
  		// console.log('length of data', data.length);
  		// console.log('name of first repo', data[0].name)
  		// console.log('name of owner', data[0].owner.login)
  		// console.log('url to repo', data[0].html_url)
  		// console.log('stargazers count', data[0].stargazers_count)

  		// db.save(data[0], (error, result) => { // TODO: send ALL Repos, not just the first
  		// 	if (error) {
  		// 		res.status(404).send('error saving to db');
  		// 	} else {
  		// 		console.log('RESULT OF SAVING TO DB:', result);
  		// 		res.send('success after db, sending back post request!')
  		// 	}
  		// })
  		data.forEach((repo) => {
  			db.save(repo, (error, result) => {
  				if (error) {
  					res.status(404).send('error saving to db');
  				} else {
  					console.log(result);
  				}
  			});
  		});
  		res.send('success!');
  	}
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  res.send('sending back get request');
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

