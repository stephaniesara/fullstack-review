import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);

    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: {username: term},
      success: (result) => {
        console.log('POST success')
        console.log(result);
        this.getRepos();
      },
      error: (err) => {
        console.log('error')
      }
    });
  }

  getRepos() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      success: (result) => {
        console.log('GET success')
        console.log(result);
        this.setState({
          repos: result
        });
      },
      error: (err) => {
        console.log('error')
      }
    })
  }

  componentDidMount() {
    this.getRepos();
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