import Order from "../models/order.js";

async function index(req, res){
    try{

        const orders = await Order.find();
        let message = '';
        if(orders.length==0){
            message="no order has been made";
        }
        res.render('admin/orders/index',{orders,message});
    }catch(err){
        res.status(500).send(err);
    }

}

export default{
    index
}