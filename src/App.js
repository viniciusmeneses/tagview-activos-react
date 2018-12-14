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
        totalMoney: '0',
        totalPercent: '0',
        actives: [],
        getTotalMoney() {
          return this.actives.reduce((total, active) => total + Number(active.money), 0).toFixed(2);
        },
        getTotalPercent() {
          return this.actives
            .reduce((total, active) => total + Number(active.percent), 0)
            .toFixed(2);
        },
      };
      if (first) {
        const newActives = this.createActive(3);
        newPortfolio.actives = [...newPortfolio.actives, ...newActives];
        newPortfolio.totalMoney = newPortfolio.getTotalMoney();
        newPortfolio.totalPercent = newPortfolio.getTotalPercent();
      }

      return {
        portfolios: [...prevState.portfolios, newPortfolio],
      };
    });
  };

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
    let activesMoney = 0;

    for (let i = 0; i < neededActives; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      const newActive = {
        id: company.id,
        name: company.name,
        money: '0',
        percent: '0',
      };
      if (neededActives > 1) {
        const money = Math.random() * 100000;
        activesMoney += money;
        newActive.money = money.toFixed(2);
      }
      actives = [...actives, newActive];
    }

    if (neededActives > 1) {
      actives = actives.map((active) => {
        const updatedActive = { ...active };
        updatedActive.percent = ((Number(active.money) * 100) / Number(activesMoney)).toFixed(2);
        return updatedActive;
      });
    }
    return actives;
  };

  removeActive = (portfolioId, activeId) => {
    this.setState((prevState) => {
      const newPortfolios = this.findPortfolioAndUpdate(
        prevState.portfolios,
        portfolioId,
        (portfolio) => {
          const updatedPortfolio = portfolio;
          if (portfolioId === portfolio.id) {
            updatedPortfolio.actives = updatedPortfolio.actives.filter(
              active => active.id !== activeId,
            );
          }
          updatedPortfolio.totalPercent = updatedPortfolio.getTotalPercent();

          return updatedPortfolio;
        },
      );

      return {
        portfolios: newPortfolios,
      };
    });
  };

  updateActiveMoney = ({ id: portfolioId, totalMoney }, activeId, percent) => {
    this.setState((prevState) => {
      const newPortfolios = this.findPortfolioAndUpdate(
        prevState.portfolios,
        portfolioId,
        (portfolio) => {
          const newPortfolio = { ...portfolio };

          newPortfolio.actives = newPortfolio.actives.map((active) => {
            const newActive = { ...active };
            if (newActive.id === activeId) {
              newActive.money = ((percent / 100) * totalMoney).toFixed(2);
              newActive.percent = percent;
            }
            return newActive;
          });

          newPortfolio.totalPercent = newPortfolio.getTotalPercent();
          return newPortfolio;
        },
      );

      return {
        portfolios: newPortfolios,
      };
    });
  };

  updateActivePercent = ({ id: portfolioId, totalMoney }, activeId, money) => {
    this.setState((prevState) => {
      const newPortfolios = this.findPortfolioAndUpdate(
        prevState.portfolios,
        portfolioId,
        (portfolio) => {
          const newPortfolio = { ...portfolio };

          newPortfolio.actives = newPortfolio.actives.map((active) => {
            const newActive = { ...active };
            if (newActive.id === activeId) {
              newActive.money = money;
              newActive.percent = ((Number(money) * 100) / Number(totalMoney)).toFixed(2);
            }
            return newActive;
          });

          newPortfolio.totalPercent = newPortfolio.getTotalPercent();
          return newPortfolio;
        },
      );

      return {
        portfolios: newPortfolios,
      };
    });
  };

  findPortfolioAndUpdate = (portfolios, portfolioId, updateCallback) => portfolios.map((portfolio) => {
    let updatedPortfolio = { ...portfolio };
    if (portfolioId === updatedPortfolio.id) {
      updatedPortfolio = updateCallback(updatedPortfolio);
    }
    return updatedPortfolio;
  });

  addPortfolio = () => {

  }

  removePortfolio = (id) => {
    this.setState((prevState) => {
      const newPortfolios = prevState.portfolios.filter(portfolio => portfolio.id !== id)
      return {
        portfolios: newPortfolios,
      };
    });
  };

  render() {
    const { portfolios } = this.state;

    return (
      <div className="App">
        <Header />
        <PortfolioList
          portfolios={portfolios}
          addPortfolio={this.createPortfolio}
          removePortfolio={this.removePortfolio}
          addActive={{
            createActive: this.createActive,
            pushActive: this.pushActivesToPortfolio,
          }}
          removeActive={this.removeActive}
          updateActive={{
            money: this.updateActiveMoney,
            percent: this.updateActivePercent,
          }}
        />
      </div>
    );
  }
}

export default App;
