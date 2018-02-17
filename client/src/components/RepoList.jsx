import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    These are your top {props.repos.length} most starred repos:
    {props.repos.map((repo, index) => 
    	<Repo repo={repo} key={index} />
    )}
  </div>
)

export default RepoList;