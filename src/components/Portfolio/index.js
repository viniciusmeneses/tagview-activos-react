import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ColorPicker from 'rc-color-picker';
import Active from '../Active';

import 'rc-color-picker/assets/index.css';
import './styles.css';

export default class Portfolio extends Component {
  state = {
    totalMoneyInput: this.props.data.totalMoney,
  };

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number,
      totalMoney: PropTypes.string,
      totalMoneyLocked: PropTypes.bool,
      totalPercent: PropTypes.string,
      actives: PropTypes.array,
      color: PropTypes.string,
      getTotalMoney: PropTypes.func,
      getTotalPercent: PropTypes.func,
    }).isRequired,
    removePortfolio: PropTypes.func.isRequired,
    updateColor: PropTypes.func.isRequired,
    addActive: PropTypes.shape({
      createActive: PropTypes.func.isRequired,
      pushActive: PropTypes.func.isRequired,
    }).isRequired,
    removeActive: PropTypes.func.isRequired,
    updateActive: PropTypes.shape({
      money: PropTypes.func.isRequired,
      percent: PropTypes.func.isRequired,
    }).isRequired,
    updateTotalMoney: PropTypes.func.isRequired,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalMoneyInput: nextProps.data.totalMoney,
    });
  }

  handleTotalMoneyChange = (e) => {
    const { data, updateTotalMoney } = this.props;
    const inputTotalMoney = e.target.value;
    updateTotalMoney(data.id, inputTotalMoney);
    this.setState({ totalMoneyInput: inputTotalMoney });
  };

  getNewTotalMoney = (updatedId, updatedMoney) => {
    const { data } = this.props;
    const updatedActives = data.actives.map((active) => {
      const newActive = { ...active };
      if (newActive.id === updatedId) {
        newActive.money = updatedMoney;
      }
      return newActive;
    });

    return updatedActives.reduce((total, active) => total + Number(active.money), 0);
  };

  render() {
    const { data, addActive, removeActive, updateActive, removePortfolio, updateColor } = this.props;
    const { totalMoneyInput } = this.state;

    return (
      <article style={{ borderTop: `2px solid ${data.color}` }}>
        <table className="actives-table">
          <thead>
            <tr>
              <th>
                Ativos (<span>{data.actives.length}</span>)
              </th>
              <th>
                <div className="total-money">
                  <span>R$</span>
                  <input type="number" name="total-money" onChange={this.handleTotalMoneyChange} value={totalMoneyInput} />
                </div>
                <div className="sub-total-money">
                  <sub>
                    (Restante: <span id="total-money-remaining"> R$ {data.totalMoneyRemaining}</span>)
                  </sub>
                </div>
              </th>
              <th>
                <strong className={`total-percent ${data.totalPercent === '100.00' ? 'total-percent-100' : ''}`}>
                  <span>{data.totalPercent}</span> %
                </strong>
                <sub className="sub-total-percent">Participação Iguais</sub>
              </th>
              <th>
                <button type="button" className="remove-button" onClick={() => removePortfolio(data.id)}>
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
                portfolio={{
                  id: data.id,
                  totalMoney: data.totalMoney,
                  totalMoneyLocked: data.totalMoneyLocked,
                }}
                removeActive={removeActive}
                updateActive={updateActive}
                getNewTotalMoney={this.getNewTotalMoney}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">
                <button type="button" className="add-button" onClick={() => addActive.pushActive(data.id, addActive.createActive())}>
                  <i className="fas fa-plus-square" /> Adicionar ativo
                </button>
              </td>
              <td>
                <ColorPicker animation="slide-up" color={data.color} onChange={e => updateColor(data.id, e.color)} />
              </td>
            </tr>
          </tfoot>
        </table>
      </article>
    );
  }
}
