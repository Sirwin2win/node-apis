const { pay } = require("../controller/paymentController");
const express = require('express')

const router = express.Router()


router.post('api/payments',pay)

module.exports = router