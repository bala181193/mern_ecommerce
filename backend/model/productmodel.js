const mongoose=require('mongoose');
const productmodel=mongoose.Schema({

    product_name:{
        type:String
    },
    image:{
        type:String
    },
    product_description:{
        type:String

    },
    price:{
        type:Number
    },
    created_date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('productentry',productmodel);