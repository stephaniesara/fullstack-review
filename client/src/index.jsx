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
    this.search = this.search.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);

    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      method: 'POST',
      data: {username: term}, // ALL DATA SENT AS JSON
      success: (result) => {
        console.log('POST success')
        console.log(result);
        this.getRepos();
      },
      error: (err) => {
        console.log('POST error')
        console.log(err);
      }
    });
  }

  getRepos() {
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      method: 'GET',
      success: (result) => {
        console.log('GET success')
        // console.log(result);
        this.setState({
          repos: result
        });
      },
      error: (err) => {
        console.log('GET error')
        console.log(err)
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
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));