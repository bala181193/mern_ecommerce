import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'
  


class Register extends React.Component{
constructor(props){
    super(props)
    this.handlechange=this.handlechange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
   
    this.state={
        user_name:'',
        phone_number:'',
        email:'',
        password:'',

    }
       
       
}
handlechange=(e)=>{
    const {name,value}=e.target;
    this.setState({
        [name]:value
    })
}
     
        
       
    


    handleSubmit=(e)=>{
            e.preventDefault()
           
            const data={
                user_name:this.state.user_name,
                email:this.state.email,
                phone_number:this.state.phone_number,
                password:this.state.password,
                user_type:"user"
            }
            console.log(data);
          axios.post('http://localhost:4000/reg',data)
          .then(res=>{
              console.log(res);
            toast.success(res);
              this.props.history.push('/');
              
          })
    }



render(){
   const{errors,select_value}=this.state;
    return(
            <div className="container mt-3">
            <div className="jumbotron">
                <h2>Register form</h2>
                <form 
                onSubmit={this.handleSubmit}
                >
                <div className="form-group">
                <label>user_name:</label>
                <input type="text"  id="user_name" placeholder="Enter User Name"
               onChange={this.handlechange}  
                name="user_name" />               
                </div>                      
    <div className="form-group">
                <label>phone number:</label>
                <input type="text"  id="user_name" placeholder="Enter Phone Number"
                onChange={this.handlechange}
                name="phone_number" />               
                </div>
               
        <div className="form-group">
    <label>Email address:</label>
    <input type="email"  placeholder="Enter email" name="email" id="email"
    onChange={this.handlechange}  
    value={this.state.email}
    />
  </div>
 
       <div className="form-group">
    <label >Password:</label>
    <input type="password"  name="password" placeholder="Enter password" id="pwd"
onChange={this.handlechange}     
    />
  </div>               
<div> 
  
</div> 
    <button type="submit" className="btn btn-primary">Register</button><br></br><br></br>
            
     <a href="#" onClick={()=>{
        window.location.href="/"
        }}>
        Login
        </a>
</form>
</div>


</div>
    )
}
}

export default Register