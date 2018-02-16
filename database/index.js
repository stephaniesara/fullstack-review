const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
// });

let repoSchema = mongoose.Schema({
	github_id: Number,
  name: String,
  owner: String,
  //description: String,
  URL: String,
  stargazers: Number
}, {
	versionKey: false
	// autoIndex: false
});

// repoSchema.set('autoIndex', false);

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // var errBool = false;

  var repo = new Repo({
  	github_id: data.id,
  	name: data.name,
  	owner: data.owner.login,
  	URL: data.html_url,
  	stargazers: data.stargazers_count
  });

  Repo.find({github_id: data.id}, (err, repos) => {
  	if (err) {
  		callback(err, null);
  	
  	} else {

  		if (repos.length === 0) {
			  repo.save((err, repo) => {
			  	if (err) {
			  		callback(err, null);
			  	} else {
			  		console.log(repo);
			  		callback(null, repo);
			  	}
			  });
			} else {
				callback(null, 'ALREADY IN DB, DID NOT SAVE')
			}

  	}
  })

  // data.forEach((elem) => {
  // 	var repo = new Repo({
  // 		name: elem.name,
  // 		owner: elem.owner.login,
  // 		URL: elem.html_url,
  // 		stargazers: elem.stargazers_count
  // 	});

  // 	repo.save((err, repo) => {
  // 		if (err) {
  // 			callback('error!', null);
  // 		}
  // 	});
  // 	// console.log(repo);
  // });

  // if (errBool) {
  // 	callback('error!', null);
  // } else {
  // 	callback(null, 'success saving to db!');
  // }
  // debugger
}

module.exports.save = save;