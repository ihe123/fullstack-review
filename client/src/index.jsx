import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoListEntry from './components/RepoListEntry.jsx';
import RepoListEntryTable from './components/RepoListEntryTable.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      //need to somehow push all the repo objects into this array of repos..
      repos: []

    }

  }

  search(term) {
    //note to self: make sure to put http:// in front of the url
    //in the frontend side we make the ajax call-- specific to jquery
    console.log(`${term} was searched`);
    post();
  }
  var post = function() {
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:1128/repos/import',
      data: {'data':term},
      success: (data) => {
        console.log (data);
       this.setState({repos: data});
      },
      dataType: 'json'
    });
  }

  var get = function (){
     $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:1128/repos',
      success: function (data) {
        console.log('data from the database', data)
       this.setState({repos: data});
      }.bind(this),
      dataType: 'json'
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      <RepoListEntryTable repos={this.state.repos} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

