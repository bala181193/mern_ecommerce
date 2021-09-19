const mongoose=require('mongoose');
const product_cart_add_model=mongoose.Schema({
product_name:{
    type:String
},
image:{
    type:String
},
price:{
    type:Number
},
qty:{
type:Number
},
value:{
    type:Number
},
user_id:{
   type:String
}

})
module.exports=mongoose.model('product_cart_list',product_cart_add_model)