const Transaction = require('../models/transactionModel');

// Total Balance, Income, Expense
exports.getOverview = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user });

    const income = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    res.json({ balance, income, expense });
  } catch (err) {
    res.status(500).json({ msg: 'Error calculating overview' });
  }
};

// Expenses by Category
exports.getCategoryBreakdown = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user, type: 'Expense' });

    const categoryTotals = {};

    transactions.forEach((t) => {
      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }
      categoryTotals[t.category] += t.amount;
    });

    res.json(categoryTotals);
  } catch (err) {
    res.status(500).json({ msg: 'Error generating category breakdown' });
  }
};

// Monthly Summary (income vs expense per month)
exports.getMonthlySummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user });

    const summary = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toISOString().slice(0, 7); // format: YYYY-MM

      if (!summary[month]) {
        summary[month] = { income: 0, expense: 0 };
      }

      if (t.type === 'Income') {
        summary[month].income += t.amount;
      } else {
        summary[month].expense += t.amount;
      }
    });

    res.json(summary);
  } catch (err) {
    res.status(500).json({ msg: 'Error generating monthly summary' });
  }
};
