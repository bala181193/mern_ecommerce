import Axios from 'axios';
import React from 'react';
import Home from '../home';
import axios from 'axios';
import {toast} from 'react-toastify';
import keys from '../config/config';
var urls=keys.base_url;
var img_url=keys.image_url;
class Product_cart_list extends React.Component{
    constructor(){
        super();
        this.cardchange=this.cardchange.bind(this);
        this.state={
          total:'',
          over_all_total:'',
          product_cart_list:[]
        }
    }

    componentDidMount(){
      this.getlist();
    }
    getlist(){

      const user={
        headers:{'auth':JSON.parse(localStorage.getItem('auth'))}
      }
      axios.get(urls+'/product_cart_list',user)
      .then(res=>{
        console.log(res.data);
        var total=0;
        for(var i=0;i<res.data.length;i++)
        {
          total=total+res.data[i].value
        }
        console.log("total",total);
        this.setState({
          product_cart_list:res.data,
          total:total
        })
        
      })

    }

    cardchange=(click)=>{
      var  over_all_total='';
      var card_value='';
      var total=this.state.total;
      if(click=='card'){
      
       card_value=parseFloat((total*2)/100);
       over_all_total=total-card_value;
      this.setState({
        over_all_total:over_all_total
      })
  
      }
      
      if(click=='cash'){
         over_all_total=total;
         this.setState({
          over_all_total:over_all_total
        })
      }
    }
    render(){
      const {product_cart_list,total}=this.state
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
                <th>Price</th>
                <th>Quantity</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
          {
            product_cart_list.map((product_cart_list,i)=>{

              return(
                <tr>
                  <td>{i+1}</td>
                  <td>
               <img src={img_url+product_cart_list.image} style={{width:"50px",height:"50px"}}/>
                  </td>
              <td>{product_cart_list.product_name}</td>
              <td>{product_cart_list.price}</td>
              <td>{product_cart_list.qty}</td>
              <td>{product_cart_list.value}</td>
                </tr>
              )
            })
            
            }
             <tr>
         <td colSpan={"5"}>Total</td>
      <td>{total}</td>
       </tr>
       <tr>
         <td colSpan={"5"}>
           <input type="radio" name="card_or_cash"  
           onClick={()=>this.cardchange("card")}          
           />card
           <input type="radio" name="card_or_cash"  
           onClick={()=>this.cardchange("cash")} 
          
          />cash
         </td>
      <td>{this.state.over_all_total}</td>
       </tr>
            </tbody>
          </tables>
          </div>  
          </div>
        )
    }
}
export default Product_cart_list;