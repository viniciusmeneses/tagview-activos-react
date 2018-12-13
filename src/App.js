import React, { Component } from 'react';
import Header from './components/Header';
import PortfolioList from './components/PortfolioList';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <PortfolioList />
      </div>
    );
  }
}

export default App;
