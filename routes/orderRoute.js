const { createOrder } = require("../controller/orderController");
const express = require('express')


const router = express.Router()

router.post('/api/orders',createOrder)

module.exports = router