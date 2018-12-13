import React from 'react';
import PropTypes from 'prop-types';
import Portfolio from '../Portfolio';

import './styles.css';

const PortfolioList = ({ portfolios, ...activeProps }) => (
  <main>
    {portfolios.map(portfolio => (
      <Portfolio key={portfolio.id} data={portfolio} {...activeProps} />
    ))}
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
};

export default PortfolioList;
