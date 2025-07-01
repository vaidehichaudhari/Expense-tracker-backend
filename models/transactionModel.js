const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Income', 'Expense'], required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
