const mongoose=require('mongoose');
const registermodel=mongoose.Schema({
    user_name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    user_type:{
        type:String
    },
    phone_number:{
        type:String
    }
})
module.exports=mongoose.model('users',registermodel);