const mongoose = require('mongoose')
// npm i bcrytp jsonwebtoken  
// order_items info ; orderRef, product_id,product_title,product_quantity,product_price

const orderItemsSchema = mongoose.Schema({
    orderRef:{
        type:String,
        required:["OrderRef is required"]
    },
    productId:{
        type:String,
        required:["ProductId is required"]
    },
    productTitle:{
        type:String,
        required:["Product title is required"]
    },
    productQuantity:{
        type:Number,
        required:["Product quantity is required"]
    },
    productPrice:{
        type:Number,
        required:["Product price is required"]
    },
},{timestamps:true})

const OrderItems = mongoose.model("OrderItems",orderItemsSchema)
module.exports = OrderItems
