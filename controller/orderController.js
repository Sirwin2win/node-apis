const Order = require('../models/orderModel')
const OrderItems = require('../models/orderItemsModel')



exports.createOrder = async(req,res)=>{
    const {totalAmount,userId} = req.body
    // const {totalAmount,userId, items} = req.body
    const orderRef = `ORD-${Date.now()}`
    const order = new Order({
        totalAmount:totalAmount,
        userId:userId,
        orderRef:orderRef,
        currency:"NGN",
        status:'pending'
    })
    try {
        const newOrder = await order.save()
        if(!order){
            return res.status(401).json({msg:"Sorry we could not create order"})
        }
        res.send(newOrder)
    } catch (error) {
        
    }

}
// orderRef, product_id,product_title,product_quantity,product_price
    // let orderItems;
    // for(let item of items){
    //     orderItems = new OrderItems({
    //         orderRef: orderRef,
    //         productId:item.product_id,
    //         productTitle:item.product_title,
    //         productQuantity:item.product_quantity,
    //         productPrice:item.product_price
    //     })
    // }

//     try {
//         const newOrder = await order.save()
//         if(!newOrder){
//             res.send("Sorry, couldn't create order at the moment")
//         }else{
//             const newOrderItems = await orderItems.save()
//             if(newOrderItems){
//                 res.send(newOrderItems.orderRef)
//             }
//         }
//     } catch (error) {
//         res.status(500).json({success:false, error:error.message})
//     }
// }