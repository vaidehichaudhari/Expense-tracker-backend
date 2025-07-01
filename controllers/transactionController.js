const Transaction = require('../models/transactionModel');

exports.addTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, description } = req.body;
    const transaction = await Transaction.create({
      userId: req.user,
      amount,
      type,
      category,
      date,
      description
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ msg: 'Error adding transaction' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching transactions' });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating transaction' });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.user });
    res.json({ msg: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting transaction' });
  }
};
