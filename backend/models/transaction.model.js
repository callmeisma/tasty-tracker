const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    account: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    action: { type: String, required: true },
    symbol: { type: String, required: true },
    instrument: { type: String, required: true },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    quantity: { type: Number, required: true },
    avgprice: { type: Number, required: true },
    commissions: { type: Number, required: true },
    fees: { type: Number, required: true },
    multiplier: { type: Number, required: true },
    rootsymbol: { type: String, required: true },
    underlyingsymbol: { type: String, required: true },
    expiration: { type: Date, required: true },
    strike: { type: Number, required: true },
    callput: { type: String, required: true },
    order: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
