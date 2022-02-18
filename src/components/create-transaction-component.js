import React, { Component } from "react";
import axios from "axios";

export default class CreateTransaction extends Component {
  constructor(props) {
    super(props);

    this.onChangeAccount = this.onChangeAccount.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeAction = this.onChangeAction.bind(this);
    this.onChangeSymbol = this.onChangeSymbol.bind(this);
    this.onChangeInstrument = this.onChangeInstrument.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeAvgPrice = this.onChangeAvgPrice.bind(this);
    this.onChangeCommissions = this.onChangeCommissions.bind(this);
    this.onChangeFees = this.onChangeFees.bind(this);
    this.onChangeMultiplier = this.onChangeMultiplier.bind(this);
    this.onChangeRootSymbol = this.onChangeRootSymbol.bind(this);
    this.onChangeUnderlyingSymbol = this.onChangeUnderlyingSymbol.bind(this);
    this.onChangeExpiration = this.onChangeExpiration.bind(this);
    this.onChangeStrike = this.onChangeStrike.bind(this);
    this.onChangeCallPut = this.onChangeCallPut.bind(this);
    this.onChangeOrder = this.onChangeOrder.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      accounts: [],
      date: new Date(),
      type: "Trade",
      action: "",
      symbol: "",
      instrument: "",
      description: "",
      value: "",
      quantity: 0,
      avgprice: 0,
      commissions: 0,
      fees: 0,
      multiplier: 0,
      rootsymbol: "",
      underlyingsymbol: "",
      expiration: new Date(),
      strike: 0,
      callput: "Put",
      order: 0,
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/accounts/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          accounts: response.data.map((accounts) => accounts.account),
          account: response.data[0].account,
        });
      }
    });
  }

  onChangeAccount(e) {
    this.setState({
      account: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value,
    });
  }

  onChangeAction(e) {
    this.setState({
      action: e.target.value,
    });
  }

  onChangeSymbol(e) {
    this.setState({
      symbol: e.target.value,
    });
  }

  onChangeInstrument(e) {
    this.setState({
      instrument: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeValue(e) {
    this.setState({
      value: e.target.value,
    });
  }

  onChangeQuantity(e) {
    this.setState({
      quantity: e.target.value,
    });
  }

  onChangeAvgPrice(e) {
    this.setState({
      avgprice: e.target.value,
    });
  }

  onChangeCommissions(e) {
    this.setState({
      commissions: e.target.value,
    });
  }

  onChangeFees(e) {
    this.setState({
      fees: e.target.value,
    });
  }

  onChangeMultiplier(e) {
    this.setState({
      multiplier: e.target.value,
    });
  }

  onChangeRootSymbol(e) {
    this.setState({
      rootsymbol: e.target.value,
    });
  }

  onChangeUnderlyingSymbol(e) {
    this.setState({
      underlyingsymbol: e.target.value,
    });
  }

  onChangeExpiration(date) {
    this.setState({
      expiration: date,
    });
  }

  onChangeStrike(e) {
    this.setState({
      strike: e.target.value,
    });
  }

  onChangeCallPut(e) {
    this.setState({
      callput: e.target.value,
    });
  }

  onChangeOrder(e) {
    this.setState({
      order: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const transaction = {
      account: this.state.account,
      date: this.state.date,
      type: this.state.type,
      action: this.state.action,
      symbol: this.state.symbol,
      instrument: this.state.instrument,
      description: this.state.description,
      value: this.state.value,
      quantity: this.state.quantity,
      avgprice: this.state.avgprice,
      commissions: this.state.commissions,
      fees: this.state.fees,
      multiplier: this.state.multiplier,
      rootsymbol: this.state.rootsymbol,
      underlyingsymbol: this.state.underlyingsymbol,
      expiration: this.state.expiration,
      strike: this.state.strike,
      callput: this.state.callput,
      order: this.state.order,
    };

    axios
      .post("http://localhost:5000/transactions/add", transaction)
      .then((res) => console.log(res.data));

    window.location = "/transactions";
  }

  render() {
    return (
      <div>
        <h3>Create New Transaction Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Account: </label>
            <select
              required
              className="form-control"
              value={this.state.account}
              onChange={this.onChangeAccount}
            >
              {this.state.accounts.map(function (user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <input
                type="date"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Type: </label>
            <select
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}
            >
              <option value="Trade">Trade</option>
            </select>
          </div>

          <div className="form-group">
            <label>Action: </label>
            <input
              required
              className="form-control"
              value={this.state.action}
              onChange={this.onChangeAction}
            />
          </div>

          <div className="form-group">
            <label>Symbol: </label>
            <input
              required
              className="form-control"
              value={this.state.symbol}
              onChange={this.onChangeSymbol}
            />
          </div>

          <div className="form-group">
            <label>Instrument: </label>
            <input
              required
              className="form-control"
              value={this.state.instrument}
              onChange={this.onChangeInstrument}
            />
          </div>

          <div className="form-group">
            <label>Description: </label>
            <input
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>

          <div className="form-group">
            <label>Value: </label>
            <input
              required
              className="form-control"
              value={this.state.value}
              onChange={this.onChangeValue}
            />
          </div>

          <div className="form-group">
            <label>Quantity: </label>
            <input
              required
              className="form-control"
              value={this.state.quantity}
              onChange={this.onChangeQuantity}
            />
          </div>

          <div className="form-group">
            <label>Avg Price: </label>
            <input
              required
              className="form-control"
              value={this.state.avgprice}
              onChange={this.onChangeAvgPrice}
            />
          </div>

          <div className="form-group">
            <label>Commissions: </label>
            <input
              required
              className="form-control"
              value={this.state.commissions}
              onChange={this.onChangeCommissions}
            />
          </div>

          <div className="form-group">
            <label>Fees: </label>
            <input
              required
              className="form-control"
              value={this.state.fees}
              onChange={this.onChangeFees}
            />
          </div>

          <div className="form-group">
            <label>Multiplier: </label>
            <input
              required
              className="form-control"
              value={this.state.multiplier}
              onChange={this.onChangeMultiplier}
            />
          </div>

          <div className="form-group">
            <label>Root Symbol: </label>
            <input
              required
              className="form-control"
              value={this.state.rootsymbol}
              onChange={this.onChangeRootSymbol}
            />
          </div>

          <div className="form-group">
            <label>Underlying Symbol: </label>
            <input
              required
              className="form-control"
              value={this.state.underlyingsymbol}
              onChange={this.onChangeUnderlyingSymbol}
            />
          </div>

          <div className="form-group">
            <label>Expiration: </label>
            <div>
              <input
                type="date"
                selected={this.state.expiration}
                onChange={this.onChangeExpiration}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Strike: </label>
            <input
              required
              className="form-control"
              value={this.state.strike}
              onChange={this.onChangeStrike}
            />
          </div>

          <div className="form-group">
            <label>Call-Put: </label>
            <select
              required
              className="form-control"
              value={this.state.callput}
              onChange={this.onChangeCallPut}
            >
              <option value="Put">Put</option>
              <option value="Call">Call</option>
            </select>
          </div>

          <div className="form-group">
            <label>Order: </label>
            <input
              required
              className="form-control"
              value={this.state.order}
              onChange={this.onChangeOrder}
            />
          </div>

          <div className="form-group">
            <input
              type="submit"
              value="Create Transaction Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
