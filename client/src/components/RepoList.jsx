import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({repos}) => (  // CAN USE DESTRUCTURING OR NOT
  <div>
    <h4> Repo List Component </h4>
    These are your top {repos.length} most starred repos:
    {repos.map((repo, index) => 
    	<Repo repo={repo} key={index} />
    )}
  </div>
)

export default RepoList;