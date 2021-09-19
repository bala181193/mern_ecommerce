import React from 'react';
import {BrowserRouter as Router,Link,Switch,Route,} from 'react-router-dom';
import logo from './logo.svg';
import './App.css'; 
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import PrivateRouter from './components/privateRoute';
import UserList from './components/user_list';
import Product_add from './components/product_details/product_add';
import Product_list from './components/product_details/product_list';
import Product_cart_add from './components/cart_details/product_cart_add';
import Product_cart_list from './components/cart_details/product_cart_list';
import Productupdate from './components/product_details/product_update';
import {ToastContainer,toast}from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className='app'>
     <Router>
    <Switch>
     <Route exact path='/' component={Login} />
     <Route exact path='/register' component={Register} /> 
     <PrivateRouter exact path='/home' component={Home} />
     <PrivateRouter exat path='/user_list' component={UserList}  />
     <PrivateRouter exact path='/product_add' component={Product_add} />
     <PrivateRouter exat path ='/product_list' component={Product_list} /> 
     <PrivateRouter exat path ='/product_cart_add' component={Product_cart_add} /> 
     <PrivateRouter exat path ='/product_cart_list' component={Product_cart_list} /> 
     <PrivateRouter exact path='/product_update/:id' component={Productupdate} />
    </Switch>
    <ToastContainer />
     </Router>
    </div>
  );
}

export default App;
