import React from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import { withRouter } from 'react-router-dom';
class Login extends React.Component{
    constructor(props){
        super(props);
        this.handlechange=this.handlechange.bind(this);
        this.submit=this.submit.bind(this);
        this.state={
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
 submit=(e)=>{
        e.preventDefault();
         const data={
        email:this.state.email,
        password:this.state.password
        }
    axios.post('http://localhost:4000/login',data)
    .then(res=>{
        console.log(res.data)
        if(res.data.res_type=='error'){
        toast.error(res.data.message);

            }else {

                if(res.data.res_type=='admin')
                {
                    localStorage.setItem('auth',JSON.stringify(res.data.token));
                    localStorage.setItem('login_type',JSON.stringify(res.data.res_type));
                    toast.success("admin login success");
                    this.props.history.push('/home');
                }
                else
                {
                    localStorage.setItem('auth',JSON.stringify(res.data.token));
                    localStorage.setItem('login_type',JSON.stringify(res.data.res_type));
                    toast.success("user login success");
                    this.props.history.push('/home');
                }
            }
    })
    .catch(err=>{
        console.log(err)
    })
}

    render(){
        return(
            <div>
                <div className="container mt-4">
                <div className="jumbotron">
                <h2>login form</h2>
<form onSubmit={this.submit} >

  <div className="form-group">
    <label>Email:</label>
    <input type="email" className="form-control" id="email" placeholder="Enter email"
    name="email"
    onChange={this.handlechange}
    value={this.state.email}
    />
    
  </div>

  <div className="form-group">
    <label>Password:</label>
    <input type="password" className="form-control" id="password" placeholder="Enter password"
    name="password" 
    onChange={this.handlechange}
    value={this.state.password}

    />
   
  </div>

  <button type="submit" className="btn btn-primary"  >Login</button><br></br><br></br>
  
  
  <a href="#" onClick={()=>{
      window.location.href="/register"
  }}>
      Register
  </a>
</form>
                </div>
                </div>
            </div>
        )
    }
}
export default withRouter( Login);