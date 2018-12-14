import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Active from '../Active';

import './styles.css';

export default class Portfolio extends Component {
  state = {
    totalMoneyInput: this.props.data.totalMoney,
  };

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number,
      totalMoney: PropTypes.string,
      totalPercent: PropTypes.string,
      actives: PropTypes.array,
      getTotalMoney: PropTypes.func,
      getTotalPercent: PropTypes.func,
    }).isRequired,
    removePortfolio: PropTypes.func.isRequired,
    addActive: PropTypes.shape({
      createActive: PropTypes.func.isRequired,
      pushActive: PropTypes.func.isRequired,
    }).isRequired,
    removeActive: PropTypes.func.isRequired,
    updateActive: PropTypes.shape({
      money: PropTypes.func.isRequired,
      percent: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalMoneyInput: nextProps.data.totalMoney,
    });
  }

  handleTotalMoneyChange = (e) => {
    this.setState({ totalMoneyInput: e.target.value });
  };

  render() {
    const {
      data, addActive, removeActive, updateActive, removePortfolio,
    } = this.props;
    const { totalMoneyInput } = this.state;

    return (
      <section>
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
                  <input
                    type="number"
                    name="total-money"
                    onChange={this.handleTotalMoneyChange}
                    value={totalMoneyInput}
                  />
                </div>
                <div className="sub-total-money">
                  <sub>
                    (Restante:
                    {' '}
                    <span id="total-money-remaining">
                      R$
                      {' '}
                      {(totalMoneyInput - data.getTotalMoney()).toFixed(2)}
                    </span>
                    )
                  </sub>
                </div>
              </th>
              <th>
                <strong
                  className={`total-percent ${
                    data.totalPercent === '100.00' ? 'total-percent-100' : ''
                  }`}
                >
                  <span>{data.totalPercent}</span>
                  {' '}
  %
                </strong>
                <sub className="sub-total-percent">Participação Iguais</sub>
              </th>
              <th>
                <button
                  type="button"
                  className="remove-button"
                  onClick={() => removePortfolio(data.id)}
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.actives.map(active => (
              <Active
                key={active.id}
                {...active}
                portfolio={{ id: data.id, totalMoney: data.totalMoney }}
                removeActive={removeActive}
                updateActive={updateActive}
              />
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
      </section>
    );
  }
}
