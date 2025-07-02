const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlwares/auth');
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,getTransactionById 
} = require('../controllers/transactionController');

router.post('/add', addTransaction);
router.get('/get', getTransactions);
router.get('/getbyId/:id', getTransactionById);
router.put('/updatebyId/:id', updateTransaction);
router.delete('/deletebyId/:id', authMiddleware.auth, deleteTransaction);

module.exports = router;
