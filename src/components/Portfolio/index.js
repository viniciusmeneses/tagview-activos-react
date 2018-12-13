import React from 'react';
import PropTypes from 'prop-types';
import Active from '../Active';

import './styles.css';

const Portfolio = ({ data, addActive, removeActive }) => (
  <table className="actives-table">
    <thead>
      <tr>
        <th>
            Ativos (
          <span>{data.actives.length}</span>
)
        </th>
        <th>
          <div className="total-money">
            <span>R$</span>
            <input type="number" name="total-money" value={data.totalMoney} />
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
            <span>{data.totalPercent}</span>
            {' '}
%
          </strong>
          <sub className="sub-total-percent">Participação Iguais</sub>
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      {data.actives.map(active => (
        <Active key={active.id} {...active} portfolio={data.id} removeActive={removeActive} />
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td colSpan="4">
          <button
            type="button"
            className="add-button"
            onClick={() => addActive.pushActive(data.id, addActive.createActive())}
          >
            <i className="fas fa-plus-square" />
            {' '}
Adicionar ativo
          </button>
        </td>
      </tr>
    </tfoot>
  </table>
);

Portfolio.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    totalMoney: PropTypes.number,
    totalPercent: PropTypes.number,
    actives: PropTypes.array,
  }).isRequired,
  addActive: PropTypes.func.isRequired,
  removeActive: PropTypes.func.isRequired,
};

export default Portfolio;
