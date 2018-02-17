const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fetcher', {autoIndex: false});


// DON'T NEED THIS BECAUSE NOT USING DB RIGHT AWAY
// THIS IS TYPICALLY TO ENSURE THAT OPS DON'T PROCEED UNTIL DB IS OPEN
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
// });

let repoSchema = mongoose.Schema({
	github_id: Number,
  name: String,
  full_name: String,
  owner: String,
  URL: String,
  stargazers: Number
}, {
	versionKey: false,
	autoIndex: false
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

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
			  		callback(null, 'saved repo to db');
			  	}
			  });
			} else {
				callback(null, 'repo already in db, did not save')
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

	// PRACTICING MONGOOSE QUERIES

	// Repo
	// .find({owner: 'stephaniesara'})
	// // .where('owner').equals('stephaniesara')
	// .where('stargazers').eq(0)
	// .exec((err, result) => {
	// 	console.log(result);
	// });

	// Repo
	// find({
	// 	$or: [
	// 	{owner: 'stephaniesara'},
	// 	{owner: 'FermiDirak'}
	// ]})

	// Repo
	// .find({})
	// .where('owner').in(['hackreactor', 'FermiDirak'])
	// .where('stargazers').ne(0)
	// .where('name').ne('DocGenXtreme')
	// // .where('stargazers').gt(0)
	// .exec((err, result) => {
	// 	console.log(result)
	// });
}

// module.exports.save = save;
// module.exports.get = get;
module.exports = {
	save: save,
	get: get
}