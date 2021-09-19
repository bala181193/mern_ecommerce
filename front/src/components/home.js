import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import axios from 'axios';
import { render } from 'react-dom';
import './home.css';
class Home extends React.Component{

    constructor(){
super();
    this.state={
        user_type:{}
    }
this.logout=this.logout.bind(this);
    }


    componentDidMount()
    {
       
       
      
    }  
 
    logout=()=>{
        localStorage.clear();
        this.props.history.push('/');
    }
    render(){
        const type={
            headers:{'login_type':JSON.parse(localStorage.getItem('login_type'))}
        }
        const user_type=type.headers.login_type;
      
        return(
            <div>
    <ul>

   
  <li><Link to={'/home'} >Home</Link></li>
    
     {
user_type=="admin" && 
  <li><Link to={'/product_add'} >Product Add</Link></li>
     }

      {
user_type=="admin" && 
  <li><Link to={'/product_list'} >Product List</Link></li>
      }

{
user_type=="admin" && 
  <li><Link to={'/user_list'}> User List </Link></li>
}

  {
 user_type=="user" &&
  <li><Link to={'/product_cart_add'} >Product Cart Add</Link></li>
    }

 {
user_type=="user" &&
  <li><Link to={'/product_cart_list'} >Product Cart List</Link></li>
}

  <li style={{float:"right"}}><a className="active" href="#about" onClick={this.logout}>Logout</a></li>
</ul>
            </div>
        )
    }
}
export default withRouter(Home);