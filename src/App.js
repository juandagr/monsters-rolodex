import React, { Component } from 'react';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
  constructor() {
    super();

    // define state of the component
    this.state = {
      monsters: [],
      searchField: ''
    };

    // define functions context when we don't use arrow functions
    // this.handleChange = this.handleChange.bind(this);
  }

  // This function is called after the component is mounted
  componentDidMount(){
    // fetch call an api and get the data => return a promise (asynchronous)
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({ monsters : users}));
  }

  // function to handle a change in the searchBox
  handleChange = e => {
    this.setState({ searchField: e.target.value }); 
  }

  render() {
    // set variables to use in render
    const {monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox 
          placeHolder = 'search monster'
          handleChange = {this.handleChange}
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
