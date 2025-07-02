const Transaction = require('../models/transactionModel');


exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, description } = req.body;
    const transaction = await Transaction.create({

      amount,
      type,
      category,
      date,
      description,
    });
    res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    console.error('Add Transaction Error:', err);
    res.status(500).json({ success: false, msg: 'Error adding transaction' });
  }
};



exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json({ success: true, data: transactions });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching transactions' });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ _id: req.params.id });
    if (!transaction) {
      return res.status(404).json({ success: false, msg: 'Transaction not found' });
    }
    res.status(200).json({ success: true, data: transaction });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching transaction' });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error updating transaction' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.params.id });
    res.json({ success: true, msg: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error deleting transaction' });
  }
};
