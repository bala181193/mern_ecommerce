const express=require('express');
const app=express();
const mongoose=require('mongoose');
const controller=require('./comtorller/router');
const bodyParser=require('body-parser');
const cors=require('cors');
const morgan=require('morgan');
mongoose.connect('mongodb://localhost:27017/ReactEcommerce',{useNewUrlParser:true},()=>{
    console.log('db conected')
})
app.use(cors());
app.use(morgan('dev'));
app.use(express.static('./public/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use('/',controller);
app.listen("4000",()=>{
console.log("4000 is running");
})