const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {autoIndex: false});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
// });

let repoSchema = mongoose.Schema({
	github_id: Number,
  name: String,
  full_name: String,
  owner: String,
  description: String,
  URL: String,
  stargazers: Number
}, {
	versionKey: false,
	// _id: false
	autoIndex: false
});

// repoSchema.set('autoIndex', false);

let Repo = mongoose.model('Repo', repoSchema);

// Repo.remove({}, (err) => {
// 	if (err) {
// 		console.log(err);
// 		return;
// 	}
// 	console.log('REMOVE collection removed');
// })

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  // var errBool = false;

  var repo = new Repo({
  	github_id: data.id,
  	name: data.name,
  	full_name: data.full_name,
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
}

let get = (callback) => {
	Repo
	.find()
	.limit(25)
	.sort({stargazers: -1})
	.select('name full_name owner stargazers URL')
	.exec((err, result) => {
		callback(err, result);
	})
}

module.exports.save = save;
module.exports.get = get;