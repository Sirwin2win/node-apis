const Payment = require('../models/paymentModel')
const axios = require('axios')
const Order = require('../models/orderModel')


exports.pay = async(req,res)=>{
const {orderRef,email,amount} = req.body
const tx_ref = `tx_${Date.now()}`

try {
    const  payment = new Payment({
        tx_ref:tx_ref,
        orderRef:orderRef,
        amount:amount,
        status:'pending',
        currency:"NGN",
        email:email,

    })
   const pay = await payment.save()
   if(!pay){
    return res.send("Sorry error occured")
   }
   const flut = await axios.post("https://api.flutterwave.com/v3/payments",{
    tx_ref,
    amount:Number(amount),
    currency:"NGN",
    redirect_url:'http://localhost:5173/payment-success',
    customer:{
        email:email,
    },
    customizations:{
        title:"Payments of goods from Sirwin",
        description:"This is for payment of the goods that you added to your cart"
    },
    },
    {
        headers:{
        Authorization:`Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type":"application/json",
    }
    }
   )
   // return payment link
   return res.json({
   link: flut.data.data.link
})
} catch (error) {
    res.send(error.message)
}
}

exports.verify = async(req,res)=>{
    const {transaction_id} = req.params;

    try {
        const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,{
            headers:{
                Authorization:`Bearer ${process.env.FLW_SECRET_KEY}`
            }
        })
        const data = response.data.data;
        // Fetch payment from the database based on the data.tx_ref
        const payment = await Payment.findOne({tx_ref:data.tx_ref})
        // Check if the payment is valid
        if(!payment){
            return res.status(404).json({msg:"Payment not found in our record"})
        }
        // Using payment info to get order details
        // const order = await Order.findOne({orderRef:payment.orderRef})

        // security check
        if(data.status==='successful' && data.amount >= payment.amount && data.currency === payment.currency){
            // Update database
            const updatedPayment = await Payment.findOneAndUpdate(
                {tx_ref:data.tx_ref},
                {
                    $set:{status:'success'},
                    
                },
                {new:true}

            );
            const updatedOrder = await Order.findOneAndUpdate({orderRef:payment.orderRef},
                {
                    $set:{status:'success'},
                    
                },
                {new:true}
            )
            return res.status(201).json({msg:"Payment verified and secured",result:updatedPayment})
        }else{
            res.send("Payment validation failed")
        }
    } catch (error) {
        res.send(error.message)
    }
}