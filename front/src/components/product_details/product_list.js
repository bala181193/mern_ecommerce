import Axios from 'axios';
import React from 'react';
import Home from '../home';
import axios from 'axios';
import keys from '../config/config';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify'
var urls=keys.base_url;
var img_url=keys.image_url;
class Product_list extends React.Component{
    constructor(){
        super();
      this.state={
        product_list:[]
      }
    }
   componentDidMount(){
   this.get_list();
  }
  
  get_list(){
    const user={
      headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
    }
axios.get(urls+'/product_list',user)
    .then(res=>{
      console.log(res.data);
      this.setState({
        product_list:res.data
      })
      console.log("product_list",this.state.product_list)
    })
  }
  delete=(id)=>{
    const user={
      headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
    }
const product_id=id;
axios.delete('http://localhost:4000/delete/'+product_id,user)
.then(res=>{
    console.log("deleted");
    toast.success(res.data.message);
    this.get_list();
})
  }
    render(){
      const product_list=this.state.product_list;
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
          {
          product_list && product_list.map((product_list,i)=>{
            return(
              
               <tr>
               <td>{i+1}</td>
               <td><img src={img_url+product_list.image} style={{weight:"50px",height:"50px"}} /></td>
               <td>{product_list.product_name}</td>
               <td>{product_list.price}</td>
             <td>
        <Link to={'/product_update/'+product_list._id} className="btn btn-primary">Edit</Link>
         <button className="btn btn-danger" onClick={()=>this.delete(product_list._id)}>Delete</button>
 
             </td>
 
             </tr>

            )
        
           }) 
            }
          
            </tbody>
          </tables>
          </div>  
          </div>
        )
    }
}
export default Product_list;