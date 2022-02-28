const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    account: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    action: { type: String},
    symbol: { type: String },
    instrument: { type: String },
    description: { type: String, required: true },
    value: { type: Number, required: true },
    quantity: { type: Number, required: true },
    avgprice: { type: Number },
    commissions: { type: Number, required: true },
    fees: { type: Number, required: true },
    multiplier: { type: Number },
    rootsymbol: { type: String },
    underlyingsymbol: { type: String },
    expiration: { type: Date },
    strikeprice: { type: Number },
    callput: { type: String },
    order: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);
