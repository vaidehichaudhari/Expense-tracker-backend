const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlwares/auth');
const {
  addTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,getTransactionById 
} = require('../controllers/transactionController');

router.post('/add', authMiddleware.auth, addTransaction);
router.get('/get', authMiddleware.auth, getTransactions);
router.get('/getbyId/:id', authMiddleware.auth, getTransactionById);
router.put('/updatebyId/:id', authMiddleware.auth, updateTransaction);
router.delete('/deletebyId/:id', authMiddleware.auth, deleteTransaction);

module.exports = router;
