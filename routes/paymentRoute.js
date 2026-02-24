const { pay ,verify} = require("../controller/paymentController");
const express = require('express')


const router = express.Router()


router.post('/api/payments',pay)
router.get('/api/payments/:transaction_id',verify)

module.exports = router