import React from 'react';

import './styles.css';

const Active = ({
  id, name, money, percent, removeActive, portfolio
}) => (
  <tr>
    <td>{name}</td>
    <td>
      <div className="active-money">
        <span>R$</span>
        {' '}
        <input type="number" name="active-money" value={money} />
      </div>
    </td>
    <td>
      <div className="active-percent">
        <input type="number" name="active-percent" value={percent} />
        {' '}
        <span>%</span>
      </div>
    </td>
    <td>
      <button type="button" className="remove-button" onClick={() => removeActive(portfolio, id)}>
        <i className="fas fa-times" />
      </button>
    </td>
  </tr>
);

export default Active;
