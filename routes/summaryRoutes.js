const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlwares/auth');
const {
  getOverview,
  getCategoryBreakdown,
  getMonthlySummary
} = require('../controllers/summaryController');

router.get('/', authMiddleware.auth, getOverview); // total balance/income/expense
router.get('/category', authMiddleware.auth, getCategoryBreakdown); // pie chart
router.get('/monthly', authMiddleware.auth, getMonthlySummary); // bar chart

module.exports = router;
