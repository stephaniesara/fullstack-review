const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL

  // SSC - https://developer.github.com/v3/repos/#list-user-repositories
  let options = {
    url: 'https://api.github.com/users/' + username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, (err, res, body) => {
    if (err) {
      console.log('error in getReposByUsername');
      callback(err, null);
    } else {
      console.log('got data from Github!')
      var data = JSON.parse(body);
      // console.log('DATA in getReposByUsername is');
      // console.log(data);
      // console.log('data from github should be arr of repos', Array.isArray(data));
      // console.log('length of github repos array', data.length);

      callback(null, data); // data is the entire list of repo objects
    }
  });

}

module.exports.getReposByUsername = getReposByUsername;