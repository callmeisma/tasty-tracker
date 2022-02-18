const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    account: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    startingBalance: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);
