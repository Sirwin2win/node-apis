const { pay ,verify} = require("../controller/paymentController");
const express = require('express')


const router = express.Router()


router.post('/api/payments',pay)
router.post('/api/payments/:transaction_id',verify)

module.exports = router