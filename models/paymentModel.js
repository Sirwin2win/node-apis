const mongoose = require('mongoose')
// npm i bcrytp jsonwebtoken  
// order info ; totalAmount, userId,orderRef,currency,status

const paymentSchema = mongoose.Schema({
    amount:{
        type:Number,
        required:["Amount is required"]
    },
    tx_ref:{
        type:String,
        required:["Transaction reference is required"]
    },
    orderRef:{
        type:String,
        required:["OrderRef is required"]
    },
    currency:{
        type:String,
        required:["currency is required"]
    },
    status:{
        type:String,
        required:["status is required"]
    },
    email:{
        type:String,
        required:["email is required"]
    },
},{timestamps:true})

const Payment = mongoose.model("Payment",paymentSchema)
module.exports = Payment
