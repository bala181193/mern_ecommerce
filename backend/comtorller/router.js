const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');
const multer=require('multer');
const Admin=require('../model/login');
const Productmodel=require('../model/productmodel');
const ProductcartlistModel=require('../model/product_cart_add');
const Usermodel=require('../model/user');
router.get('/',(req,res)=>{
console.log('GGGGGGGGGGGO');

})

router.post('/reg',(req,res)=>{
const user_name=req.body.user_name;
const email=req.body.email;
const password=req.body.password;
const user_type=req.body.user_type;
const phone_number=req.body.phone_number;
if(user_type=="admin")
{
    new Admin({
        user_name:user_name,
        email:email,
        password:password,
        user_type:user_type
    }).save((err,data)=>{
        console.log(data)
    })
}
else{

    new Admin({
        user_name:user_name,
        email:email,
        password:password,
        user_type:"user"
    }).save((err,data)=>{
        console.log("admin",data)
        new Usermodel({
            user_name:user_name,
            email:email,
            password:password,
            phone_number:phone_number,
           user_type:"user"
        }).save((err,data)=>{
         res.json({mesaage:"inserted"})
        })
    })
  
}

})
router.post('/login',(req,res)=>{

    const email=req.body.email;
    const password=req.body.password;
    Admin.findOne({'email':email},(err,data)=>{
        if(err){
            console.log(err)
        }
  else  if(data==null){
        res.json({message:"invalid email",res_type:"error"});
    }
    else if(data.password!=req.body.password){
        res.json({message:"invalid password",res_type:"error"});

    }
    else{
        mydata={
            id:data._id,
            email:data.email,
            user_type:data.user_type
        }
        
        var token=jwt.sign({mydata}, 'secret', { expiresIn: '1h'}, {algorithm: "HS256"});
        res.header('auth',token).json({token,res_type:data.user_type});
        console.log(token)

    }

    })


})
const validuser=(req,res,next)=>{
    var token=req.header('auth');
  req.token=token
    next();
}

var product_image=[];
var storage=multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./public/uploads');
    },
    filename:(req,file,callback)=>{
var name='';
var ext='';
if(file.originalname){
    var p =file.originalname.lastIndexOf('.');
    ext=file.originalname.substring(p+1);
    var firstname=file.originalname.substring(0,p+1);
    name=Date.now()+'_'+firstname;
    name+=ext; 
  }
  product_image=[];
  product_image.push({'name':name});
callback(null,name)

    }

})
const upload=multer({storage:storage,limits:{filesize:10}}).array('image');
router.post('/product_add',validuser,upload,(req,res)=>{
   // console.log(req.body)
    var token=req.token;
    // console.log("token",token);
    try{
        jwt.verify(token,'secret',(err,data)=>{
           console.log(data);
          const product_name=req.body.product_name;
          const image=product_image[0].name;
          const product_description=req.body.product_description;
          const price=req.body.price;
         new Productmodel({
             product_name,image,product_description,price
         }).save((err,data)=>{
             res.json({message:"inserted"});
         })
        })
    }catch{
res.json({message:'go to login '});
    }

})

router.get('/product_list',validuser,(req,res)=>{
   
   // console.log(id)
    const token=req.token;
  console.log("valid user",token);
    try{
    jwt.sign(token,'secret',(err,data)=>{
        Productmodel.find({},(err,product)=>{
         res.json(product);
        })
    })
}catch{
    res.json({message:'go to login '});
}
})

router.get('/product_get_id/:id',validuser,(req,res)=>{

    var id=req.params.id;
    const token=req.token
  //  console.log("token",token);
    jwt.verify(token,'secret',(err,data)=>{
        Productmodel.findOne({'_id':id},(err,product)=>{
            res.json(product);
        })
    })
})
router.post('/product_update/:id',validuser,upload,(req,res)=>{
    var id=req.params.id;
    console.log("id",id);
const token=req.token;
console.log("token",token);
try{
jwt.sign(token,'secret',(err,data)=>{
console.log(req.files);
  console.log(req.body)
    if(req.files==''){
        const update_data={
            product_name:req.body.product_name,
            product_description:req.body.product_description,
            price:req.body.price
        }
        Productmodel.findByIdAndUpdate({'_id':id},{$set:update_data},{new:true},(err,product)=>{
            console.log("no",product);
            res.json({message:"updated"})
           
        })
    }
    else{
        const update_data={
            product_name:req.body.product_name,
            image:product_image[0].name,
            product_description:req.body.product_description,
            price:req.body.price
        }
        Productmodel.findByIdAndUpdate({'_id':id},{$set:update_data},{new:true},(err,product)=>{
            console.log("yes",product);
            res.json({message:"updated"})

           
        })
      }
     
})
}catch{

}
})

router.delete('/delete/:id',validuser,(req,res)=>{
    const token=req.token;
    var id=req.params.id;
    console.log(id);
    console.log("token",token);
     try{
           jwt.verify(token,'secret',(err,data)=>{
            Productmodel.findByIdAndDelete({'_id':id},()=>{
    
                res.json({message:'deleted success'});
            })
           })
       
        }catch{
    
        }

})
router.post('/product_cart_add',validuser,upload,(req,res)=>{

        const token=req.token;
        jwt.verify(token,'secret',(err,data_token)=>{
           try{
               var user_id=data_token.mydata.id
             
            let data_array=[];
           let data=req.body;
          // console.log(data);
            data.forEach(items => {
                data_array.push({
                    product_name:items.product_name,
                    user_id:user_id,
                    image:items.image,
                    price:items.price,
                    qty:items.qty,
                    value:parseFloat(items.price)*parseInt(items.qty)

                })
            });
//console.log(data_array)
            ProductcartlistModel.insertMany(data_array,(err,result)=>{

              res.json({message:'product cart added success'})

            })

           }catch{

           }
            
        })

})

router.get('/product_cart_list',validuser,(req,res)=>{

    const token=req.token;
    console.log(token);
   try{
       jwt.verify(token,'secret',(err,data)=>{

        var id=data.mydata.id;
        ProductcartlistModel.find({'user_id':id},(err,product)=>{

            res.json(product);
        })
       })
   }catch{

   }
})

router.get('/user_list',validuser,(req,res)=>{

console.log(req.token);
Usermodel.find({},(err,data)=>{

    res.json(data)
})

})
module.exports=router