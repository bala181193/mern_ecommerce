import Axios from 'axios';
import React from 'react';
import axios from 'axios'
import Home from '../components/home'
class UserList extends React.Component{

    constructor(){
        super()
        this.state={
           user_data:[]
        }
    }
    componentDidMount()
    {
        const user={
            headers:{'auth':JSON.parse(localStorage.getItem('auth'))}
        }
        console.log(user);
        axios.get('http://localhost:4000/user_list',user)
        .then(res=>{
          
            this.setState({
                user_data:res.data
            })
        })
    }
    render()
    {
        const {user_data}=this.state
        return(
            <div>
            <Home />
          <div className="container mt-3">
          <tables className="table table-striped">
          <thead>
            <tr>
                <th>SNO</th>
                <th>User Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
        {
        user_data && user_data.map((user,i)=>{
          return(
            
             <tr>
             <td>{i+1}</td>
             <td>{user.user_name}</td>
             <td>{user.email}</td>
             <td>{user.password}</td>
          

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
export default UserList;