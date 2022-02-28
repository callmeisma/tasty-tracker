import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const EditTransaction = (props) => {
  let today = moment().format("YYYY-MM-DD");
  const [accounts, setAccounts] = useState([]);
  const [account,setAccount] = useState();
  const [date,setDate] = useState(today);
  const [type,setType] = useState();
  const [action,setAction] = useState();
  const [symbol,setSymbol] = useState();
  const [instrument,setInstrument] = useState();
  const [description,setDescription] = useState();
  const [value,setValue] = useState();
  const [quantity,setQuantity] = useState();
  const [avgprice,setAvgprice] = useState();
  const [commissions,setCommissions] = useState();
  const [fees,setFees] = useState();
  const [multiplier,setMultiplier] = useState();
  const [rootsymbol,setRootsymbol] = useState();
  const [underlyingsymbol,setUnderlyingsymbol] = useState();
  const [expiration,setExpiration] = useState(today);
  const [strikeprice,setStrikeprice] = useState();
  const [callput,setCallput] = useState();
  const [order, setOrder] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4000/transactions/" + props.match.params.id)
      .then((res) => {
        console.log(res.data)
        setAccount(res.data.account)
        setDate(res.data.date)
        setType(res.data.type)
        setAction(res.data.action)
        setSymbol(res.data.symbol)
        setInstrument(res.data.instrument)
        setDescription(res.data.description)
        setValue(res.data.value)
        setQuantity(res.data.quantity)
        setAvgprice(res.data.avgprice)
        setCommissions(res.data.commissions)
        setFees(res.data.fees)
        setMultiplier(res.data.multiplier)
        setRootsymbol(res.data.rootsymbol)
        setUnderlyingsymbol(res.data.underlyingsymbol)
        setExpiration(res.data.expiration)
        setStrikeprice(res.data.strikeprice)
        setCallput(res.data.callput)
        setOrder(res.data.order)
      });

      axios
      .get("http://localhost:4000/accounts/")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const transaction = {
      account: account,
      date: date,
      type: type,
      action: action,
      symbol: symbol,
      instrument: instrument,
      description: description,
      value: value,
      quantity: quantity,
      avgprice: avgprice,
      commissions: commissions,
      fees: fees,
      multiplier: multiplier,
      rootsymbol: rootsymbol,
      underlyingsymbol: underlyingsymbol,
      expiration: expiration,
      strikeprice: strikeprice,
      callput: callput,
      order: order,
    };

    axios
      .post(
        "http://localhost:4000/transactions/update/" +
          props.match.params.id,
        transaction
      )
      .then((res) => console.log(res.data));

    window.location = "/transactions";
  }

  return (
    <div>
      <h3>Edit Transaction Log</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label>Account: </label>
          <select
            required
            className="form-control"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          >
            {accounts.map(function (account) {
              return (
                <option key={account.account} value={account.account}>
                  {account.account}
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
              value={date.substring(0,10) || today}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Type: </label>
          <select
            required
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="trade">Trade</option>
            <option value="cash-transfer">Cash Transfer</option>
            <option value="receive-deliver">Receive | Deliver</option>
            <option value="dividend">Dividend</option>
            <option value="interest">Interest</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Action: </label>
          <input
            required
            className="form-control"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Symbol: </label>
          <input
            required
            className="form-control"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Instrument: </label>
          <input
            required
            className="form-control"
            value={instrument}
            onChange={(e) => setInstrument(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description: </label>
          <input
            required
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Value: </label>
          <input
            required
            className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Quantity: </label>
          <input
            required
            className="form-control"
            value={quantity}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Avg Price: </label>
          <input
            required
            className="form-control"
            value={avgprice}
            onChange={(e) => setAvgprice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Commissions: </label>
          <input
            required
            className="form-control"
            value={commissions}
            onChange={(e) => setCommissions(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Fees: </label>
          <input
            required
            className="form-control"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Multiplier: </label>
          <input
            required
            className="form-control"
            value={multiplier}
            onChange={(e) => setMultiplier(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Root Symbol: </label>
          <input
            required
            className="form-control"
            value={rootsymbol}
            onChange={(e) => setRootsymbol(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Underlying Symbol: </label>
          <input
            required
            className="form-control"
            value={underlyingsymbol}
            onChange={(e) => setUnderlyingsymbol(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Expiration: </label>
          <div>
            <input
              type="date"
              value={expiration.substring(0,10) || today}
              onChange={(e) => setExpiration(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Strike: </label>
          <input
            required
            className="form-control"
            value={strikeprice}
            onChange={(e) => setStrikeprice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Call-Put: </label>
          <select
            required
            className="form-control"
            value={callput}
            onChange={(e) => setCallput(e.target.value)}
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
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Update Transaction Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
    );
  }
export default EditTransaction