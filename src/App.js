import React, { Component } from 'react';
import Header from './components/Header';
import PortfolioList from './components/PortfolioList';

import companies from './assets/mockCompanies.json';

import './App.css';

class App extends Component {
  state = {
    portfolios: [],
  };

  componentDidMount() {
    this.createPortfolio(true);
  }

  createPortfolio = (first = false) => {
    this.setState((prevState) => {
      const newPortfolio = {
        id: prevState.portfolios.length,
        totalMoney: 0,
        totalPercent: 0,
        actives: [],
      };

      if (first) {
        newPortfolio.actives = [...newPortfolio.actives, ...this.createActive(3)];
      }

      return {
        portfolios: [...prevState.portfolios, newPortfolio],
      };
    });
  };

  createActive = (neededActives = 1) => {
    let actives = [];

    for (let i = 0; i < neededActives; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      const newActive = {
        id: company.id,
        name: company.name,
        money: 0,
        percent: 0,
      };
      actives = [...actives, newActive];
    }
    return actives;
  };

  render() {
    const { portfolios } = this.state;
    return (
      <div className="App">
        <Header />
        <PortfolioList portfolios={portfolios} />
      </div>
    );
  }
}

export default App;
