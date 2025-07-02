const Transaction = require('../models/transactionModel');

// Total Balance, Income, Expense
exports.getOverview = async (req, res) => {
  try {
    const transactions = await Transaction.find(); // 👈 all data

    let income = 0, expense = 0;

    transactions.forEach((txn) => {
      if (txn.type === 'Income') income += txn.amount;
      else if (txn.type === 'Expense') expense += txn.amount;
    });

    res.json({
      success: true,
      data: {
        income,
        expense,
        balance: income - expense,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCategoryBreakdown = async (req, res) => {
   try {
    const transactions = await Transaction.find(); // 👉 gets all transactions

    const categoryMap = {};

    transactions.forEach((txn) => {
      if (txn.type === 'Expense') {
        categoryMap[txn.category] = (categoryMap[txn.category] || 0) + txn.amount;
      }
    });

    const categories = Object.keys(categoryMap);
    const amounts = Object.values(categoryMap);

    res.json({ success: true, data: { categories, amounts } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }

};


// Monthly Summary (income vs expense per month)
exports.getMonthlySummary = async (req, res) => {
  try {

    const transactions = await Transaction.find();

    const summary = {};

    transactions.forEach((t) => {
      const month = new Date(t.date).toISOString().slice(0, 7); // YYYY-MM format

      if (!summary[month]) {
        summary[month] = { income: 0, expense: 0 };
      }

      if (t.type === 'Income') {
        summary[month].income += t.amount;
      } else {
        summary[month].expense += t.amount;
      }
    });

    // Convert summary object to arrays for frontend chart
    const months = Object.keys(summary).sort();
    const income = months.map((month) => summary[month].income);
    const expense = months.map((month) => summary[month].expense);

    res.json({
      success: true,
      data: {
        months,
        income,
        expense,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error generating monthly summary' });
  }
};
