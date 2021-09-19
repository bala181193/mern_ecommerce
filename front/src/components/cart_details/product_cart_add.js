import React from 'react';
import Home from '../home';
import axios from 'axios';
import keys from '../config/config';
import {toast} from 'react-toastify'
var urls=keys.base_url;
var img_url=keys.image_url;
class Product_cart_add extends React.Component{
    constructor(){
        super();
        
        this.state={
        select_product:[],
          product_details: [{
            price: "", qty: "",image:"",product_name:"",product_id:'',
          }],
        }


    }
    componentDidMount(){
      this.get_product_list();
    }
    get_product_list(){

     var  user={
        headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
      }
      axios.get(urls+'/product_list',user)
      .then(res=>{
        console.log("res.data",res.data)
      var data=[];
      for(var i=0;i<res.data.length;i++)
      {
       
          data.push({price:res.data[i].price
            ,image:res.data[i].image
            ,qty:0
            ,product_name:res.data[i].product_name
            ,product_id:res.data[i]._id,
            
          })
          this.setState({
            product_details:data
          })
        
      }
      })

    }

    changeproducts(i, e) {
      const { name, value } = e.target;
      let product_details = [...this.state.product_details];
      product_details[i] = {...product_details[i], [name]: value};
      this.setState({
        product_details:product_details
      })
    }
    onclick=()=>{
      var selected_data=[];
var product_details=this.state.product_details;
product_details.forEach(data=>{
  //console.log(data)
  if(data.qty>0){
selected_data.push(data)
  }
})
console.log(selected_data)
const user={
  headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
}
axios.post('http://localhost:4000/product_cart_add',selected_data,user)
.then(res=>{
toast.success(res.data.messsage);
this.props.history.push('/product_cart_add');
})
.catch(err=>{
  console.log('err',err)
})
    }
    render(){
      const {product_details}=this.state;
      console.log("products_add",product_details)
        return(
          <div>
              <Home />
            <div className="container mt-3">
            <tables className="table table-striped">
            <thead>
              <tr>
                  <th>SNO</th>
                  <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                
              </tr>
            </thead>
            <tbody>
          {
            product_details.map((product_details,i)=>{

              return(
                <tr>
                  <td>{i+1}</td>
                  <td>{
                    <img src={img_url+product_details.image} style={{width:"50px",height:'50px'}}/>
                     }
                     </td>
                    <td>{product_details.product_name}</td>
                    <td><input type="number" name="qty"  onChange={this.changeproducts.bind(this, i)} /></td>
                    <td>{product_details.price}</td>
                </tr>
              )
            })
            }
            <tr>
              <td colSpan={"5"}></td>
          <td colSpan={"1"}><button className="btn btn-danger" onClick={this.onclick} >Cart Add</button>
                    </td>
          </tr>
            </tbody>
          </tables>
          </div>  
          </div>
        )
    }
}
export default Product_cart_add;