const mongoose = require('mongoose')
// npm i bcrytp jsonwebtoken  
// order info ; totalAmount, userId,orderRef,currency,status

const orderSchema = mongoose.Schema({
    totalAmount:{
        type:Number,
        required:["TotalAmount is required"]
    },
    userId:{
        type:String,
        required:["UserId is required"]
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
},{timestamps:true})

const Order = mongoose.model("Order",orderSchema)
module.exports = Order
