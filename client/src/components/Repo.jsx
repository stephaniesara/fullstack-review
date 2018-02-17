import React from 'react';

const Repo = (props) => (
  <div>
    <a href={props.repo.URL}>{props.repo.name}</a> 
    by {props.repo.owner} 
    has <b>{props.repo.stargazers}</b> stars
  </div>
)

export default Repo;