import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

export default class Active extends Component {
  state = {
    moneyInput: this.props.money,
    percentInput: this.props.percent,
  };

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    money: PropTypes.string.isRequired,
    percent: PropTypes.string.isRequired,
    removeActive: PropTypes.func.isRequired,
    portfolio: PropTypes.number.isRequired,
  };

  handleMoneyInput = (e) => {
    this.setState({ moneyInput: e.target.value });
  };

  handlePercentInput = (e) => {
    this.setState({ percentInput: e.target.value });
  };

  render() {
    const {
      id, name, removeActive, portfolio,
    } = this.props;
    const { moneyInput, percentInput } = this.state;

    return (
      <tr>
        <td>{name}</td>
        <td>
          <div className="active-money">
            <span>R$</span>
            {' '}
            <input
              type="number"
              name="active-money"
              onChange={this.handleMoneyInput}
              value={moneyInput}
            />
          </div>
        </td>
        <td>
          <div className="active-percent">
            <input
              type="number"
              name="active-percent"
              onChange={this.handlePercentInput}
              value={percentInput}
            />
            {' '}
            <span>%</span>
          </div>
        </td>
        <td>
          <button
            type="button"
            className="remove-button"
            onClick={() => removeActive(portfolio, id)}
          >
            <i className="fas fa-times" />
          </button>
        </td>
      </tr>
    );
  }
}
