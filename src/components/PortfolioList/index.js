import React from 'react';
import PropTypes from 'prop-types';
import Portfolio from '../Portfolio';

import './styles.css';

const PortfolioList = ({
  portfolios, addPortfolio, removePortfolio, ...activeProps
}) => (
  <main>
    {portfolios.map(portfolio => (
      <Portfolio
        key={portfolio.id}
        data={portfolio}
        removePortfolio={removePortfolio}
        {...activeProps}
      />
    ))}
    <div className="add-portfolio">
      <button type="button" onClick={() => addPortfolio()}>
        <i className="fa fa-plus-square" />
      </button>
    </div>
  </main>
);

PortfolioList.propTypes = {
  portfolios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      totalMoney: PropTypes.string,
      totalPercent: PropTypes.string,
      actives: PropTypes.array,
    }),
  ).isRequired,
  addPortfolio: PropTypes.func.isRequired,
  removePortfolio: PropTypes.func.isRequired,
};

export default PortfolioList;
