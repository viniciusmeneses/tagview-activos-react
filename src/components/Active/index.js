import React from 'react';

import './styles.css';

const Active = props => (
  <tr id="${active.id}">
    <td>
$
      {active.name}
    </td>
    <td>
      <div className="active-money">
        <span>R$</span>
        {' '}
        <input
          type="number"
          id="active-money-input-${
                active.id
              }"
          value="${active.money}"
        />
      </div>
    </td>
    <td>
      <div className="active-percent">
        <input
          type="number"
          id="active-percent-input-${
                active.id
              }"
          value="${active.percent}"
        />
        {' '}
        <span>%</span>
      </div>
    </td>
    <td>
      <button
        type="button"
        className="remove-button"
        id="remove-button-${
              active.id
            }"
      >
        <i className="fas fa-times" />
      </button>
    </td>
  </tr>
);

export default Active;
