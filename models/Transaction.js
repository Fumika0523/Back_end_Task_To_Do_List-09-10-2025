const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",          // link each transaction to a User
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, 'Amount must be positive'],
    },
    category: {
      type: String,
      required: true,       // e.g. "Groceries", "Rent", "Salary"
    },
    description: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: Date.now,    // when the transaction happened
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "card", "bank", "other"],
      default: "cash",
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
