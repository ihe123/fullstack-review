import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
  }
  onChange (e) {

    //there's this onChange function...
    //the binding is off for this..
    this.setState({
      //changes the state of the term in the constructor, which is triggered by
      //a change in the input box
      //the term points to the value in the input box
      //this.setState... re-renders (part of?) the page 
      term: e.target.value
    });
  }

  search() {
    //this is a search function that is assigned to a click listener
    //search function points to the function that we're supposed to write 
    //in the index.jsx file.. why does it need to be defined there vs. here?
    this.props.onSearch(this.state.term);
  }

  render() {
    return (<div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={this.state.term} onChange={this.onChange.bind(this)}/>       
      <button onClick={this.search.bind(this)}> Add Repos </button>
    </div>) 
  }
}

export default Search;