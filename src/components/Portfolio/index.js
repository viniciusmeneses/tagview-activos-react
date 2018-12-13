import React from 'react';

import './styles.css';

const Portfolio = props => (
  <table className="actives-table">
    <thead>
      <tr>
        <th>
          Ativos (
          <span id="actives-count">3</span>
)
        </th>
        <th>
          <div className="total-money">
            <span>R$</span>
            <input type="number" name="total-money" id="total-money" />
          </div>
          <div className="sub-total-money">
            <sub>
              (Restante:
              <span id="total-money-remaining">-720,43</span>
)
            </sub>
          </div>
        </th>
        <th>
          <strong className="total-percent">
            <span id="total-percent">0</span>
            {' '}
%
          </strong>
          <sub className="sub-total-percent">Participação Iguais</sub>
        </th>
        <th />
      </tr>
    </thead>
    <tbody id="actives-list" />
    <tfoot>
      <tr>
        <td colSpan="4">
          <button type="button" className="add-button" id="add-button">
            <i className="fas fa-plus-square" />
            {' '}
Adicionar ativo
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
);

return Portfolio;
