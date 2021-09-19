import React from 'react';
import axios from 'axios';
import keys from '../config/config';
import Home from '../home';
import {toast} from 'react-toastify';
var urls=keys.base_url;
class Product_add extends React.Component{
    constructor(){
        super();
        this.handlechange=this.handlechange.bind(this);
        this.handlesubmit=this.handlesubmit.bind(this);
        this.onChangeimage=this.onChangeimage.bind(this);
        this.state={
          product_name:'',
          price:'',
          change_image:'',
          image:'',
          files:'',
        }
    }
    handlechange=(e)=>{
      const{name,value}=e.target;
      this.setState({
        [name]:value
      })
    }
    onChangeimage=(e)=>{
      this.setState({change_image:URL.createObjectURL(e.target.files[0])});
      this.setState({image:e.target.files[0]});

    }
    handlesubmit=(e)=>{
      e.preventDefault();
      const user={
        headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
      }
     
      const formdata=new FormData();
      formdata.append('image',this.state.image);
      formdata.append('product_name',this.state.product_name);
      formdata.append('price',this.state.price);
      axios.post(urls+'/product_add',formdata,user)
      .then(res=>{
        toast.success(res.data.message);
    this.setState({
      product_name:'',
      price:'',
      files:'',
      change_image:''
    })
      })
      .catch(err=>{
        console.log(err);
      })
    }
    render(){
        return(
            <div>
                 <Home />
            <div className="container mt-3">
            <div className="jumbotron">
            <form   encType="multipart/form-data"  onSubmit={this.handlesubmit}>
 <div className="form-group"  >
   <label>Product Name</label>
   <input type="text" className="form-control" placeholder="Product Name" id="Name" name="product_name" 
  onChange={this.handlechange}
  value={this.state.product_name}
   />
 </div>
 
 <div>
   <label>Price</label>
   <input type="text" className="form-control" placeholder="Enter Price" id="Price" name="price"
    onChange={this.handlechange}
    value={this.state.price}
   />
 </div>
 <div>
   <label>Image</label>
   {this.state.change_image!='' ?
   <img src={this.state.change_image} style={{width:"100px",height:"100px"}}/>
  :
  null  
  }
    
   <input type="file" className="form-control" placeholder="" id="image" name="image" 
  onChange={this.onChangeimage}
  value={this.state.files}
  />
 </div>
 <button type="submit"  className="btn btn-primary">Add</button>
</form>

            </div>

        </div>
        </div>
        
        )
    }
}
export default Product_add;