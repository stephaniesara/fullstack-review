import React from 'react';

const Repo = ({repo}) => (
  <div>
    <a href={repo.URL}>{repo.name}</a> 
    - by {repo.owner}
    - <b>{repo.stargazers}</b> stars
  </div>
)

export default Repo;