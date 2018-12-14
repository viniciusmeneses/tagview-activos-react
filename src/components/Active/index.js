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
    portfolio: PropTypes.shape({
      id: PropTypes.number,
      totalMoney: PropTypes.string,
    }).isRequired,
    removeActive: PropTypes.func.isRequired,
    updateActive: PropTypes.shape({
      money: PropTypes.func.isRequired,
      percent: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      moneyInput: nextProps.money,
      percentInput: nextProps.percent,
    });
  }

  handleMoneyInput = (e) => {
    const { id, updateActive, portfolio } = this.props;
    const inputValue = e.target.value;
    this.setState({ moneyInput: inputValue });
    updateActive.percent(portfolio, id, inputValue);
  };

  handlePercentInput = (e) => {
    const { id, updateActive, portfolio } = this.props;
    const inputValue = e.target.value;
    this.setState({ percentInput: inputValue });
    updateActive.money(portfolio, id, inputValue);
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
            onClick={() => removeActive(portfolio.id, id)}
          >
            <i className="fas fa-times" />
          </button>
        </td>
      </tr>
    );
  }
}
