import React from 'react';

const RepoListEntry = (props) => (
  // <span>{props.repo['GithubRepo_Id']}</span>
  // <span>{props.repo.Name}</span>
  // <span>{props.repo.Login}</span>
<div>{props.repo.GithubRepo_Id} {props.repo.Login} {props.repo.Name} <a href={props.repo.Url}>{props.repo.Url}</a></div>
)


export default RepoListEntry; 