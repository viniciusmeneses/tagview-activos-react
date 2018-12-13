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
        const newActives = this.createActive(3);
        newPortfolio.actives = [...newPortfolio.actives, ...newActives];
        newPortfolio.totalMoney = this.getTotalMoney(newActives);
        newPortfolio.totalPercent = this.getTotalPercent(newActives);
      }

      return {
        portfolios: [...prevState.portfolios, newPortfolio],
      };
    });
  };

  getTotalMoney = actives => actives.reduce((total, active) => total + Number(active.money), 0).toFixed(2);

  getTotalPercent = actives => actives.reduce((total, active) => total + Number(active.percent), 0).toFixed(2);

  pushActivesToPortfolio = (id, actives) => {
    this.setState(prevState => ({
      portfolios: prevState.portfolios.map((portfolio) => {
        const newPortfolio = portfolio;
        if (portfolio.id === id) {
          newPortfolio.actives = [...portfolio.actives, ...actives];
        }
        return newPortfolio;
      }),
    }));
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
      if (neededActives > 1) {
        newActive.percent = (Math.random() * 100).toFixed(2);
        newActive.money = ((newActive.percent / 100) * (Math.random() * 100000)).toFixed(2);
      }
      actives = [...actives, newActive];
    }
    return actives;
  };

  removeActive = (portfolioId, activeId) => {
    this.setState(prevState => ({
      portfolios: prevState.portfolios.map((portfolio) => {
        const updatedPortfolio = portfolio;
        if (portfolioId === portfolio.id) {
          updatedPortfolio.actives = updatedPortfolio.actives.filter(
            active => active.id !== activeId,
          );
        }
        return updatedPortfolio;
      }),
    }));
  };

  render() {
    const { portfolios } = this.state;
    return (
      <div className="App">
        <Header />
        <PortfolioList
          portfolios={portfolios}
          addActive={{
            createActive: this.createActive,
            pushActive: this.pushActivesToPortfolio,
          }}
          removeActive={this.removeActive}
        />
      </div>
    );
  }
}

export default App;
