const Payment = require('../models/paymentModel')
const axios = require('axios')


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
   const flut = await axios.post('htts://api.flutterwave.com/v3/payments',{
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
    Headers:{
        Authorization:`Bearer ${process.env.FLW_SECRET_KEY}`,
        "Content-Type":"application/json",
    }
   })
   // return payment link
   return res.json({
    link:flut.data.data.link
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
        if(data.status==='successful'){
            console.log('Update the database')
        }
    } catch (error) {
        
    }
}