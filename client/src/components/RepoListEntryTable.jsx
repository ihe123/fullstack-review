import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoListEntryTable = (props) => (
  <div>
    {
      props.repos.map(repo => (<RepoListEntry repo={repo} key={repo.id} />))
    }
  </div>
)

export default RepoListEntryTable;