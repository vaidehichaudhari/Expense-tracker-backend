const express = require('express');
const router = express.Router();

const {
  getOverview,
  getCategoryBreakdown,
  getMonthlySummary
} = require('../controllers/summaryController');

router.get('/get',  getOverview); // total balance/income/expense
router.get('/category', getCategoryBreakdown); // pie chart
router.get('/monthly', getMonthlySummary); // bar chart

module.exports = router;
