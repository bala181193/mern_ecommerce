import React from 'react';
import axios from 'axios';
import keys from '../config/config';
import Home from '../home';
import {toast} from 'react-toastify';
var urls=keys.base_url;
var img_url=keys.image_url;
class Productupdate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            product_name:'',
            price:'',
            change_image:'',
            image:'',
            files:'',
          }
      
    }
    
     componentDidMount(){

        this.getId()
    }
    getId(){
        const user={
            headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
        }
      console.log(this.props.match.params.id);
      var id=this.props.match.params.id
      axios.get(urls+'/product_get_id/'+id,user)
      .then(res=>{
        
          this.setState({
            product_name:res.data.product_name,
              price:res.data.price,
              image:res.data.image
          })
      })
    }
    handlechange=(e)=>{
    const {name,value}=e.target;
    this.setState({
        [name]:value
    })
    }
    onChangeimage=(e)=>{
     this.setState({image:e.target.files[0]});
     this.setState({change_image:URL.createObjectURL(e.target.files[0])});
    }
    handlesubmit=(e)=>{
      e.preventDefault();
      var id=this.props.match.params.id;
      console.log("id",id);
      const user={
        headers:{'auth':`${JSON.parse(localStorage.getItem('auth'))}`}
    }
    console.log(user);
      const formdata=new FormData();
      formdata.append('image',this.state.image);
      formdata.append('product_name',this.state.product_name);
      formdata.append('price',this.state.price);
      axios.post(urls+'/product_update/'+id,formdata,user)
      .then(res=>{
          console.log("updated");
          this.props.history.push('/product_list')
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
  <img src={img_url+this.state.image} style={{width:"100px",height:"100px"}}/>
  }
    
   <input type="file" className="form-control" placeholder="" id="image" name="image" 
  onChange={this.onChangeimage}
  
  />
 </div>
 <button type="submit"  className="btn btn-primary">Update</button>
</form>

            </div>

        </div>
        </div>
        
        )
    }
}
export default Productupdate;