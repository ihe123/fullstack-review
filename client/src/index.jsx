import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

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
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:1128/repos/import',
      data: {'data':term},
      success: (data) => {
       this.setState({repos: data});
      },
      dataType: 'json'
    });
    
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));