import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const PrivateRouter=({component,...rest})=>{

    console.log(rest);
    let RenderComponent=component;
    let hashtoken=JSON.parse(localStorage.getItem('auth'));
    // console.log(hashtoken)
    return(
        <Route 
        {...rest}
        render={
            props=>{
                return hashtoken!=null?(
                    <RenderComponent {...props} />
                )
                :(
                    <Redirect 
                    to={{
                        pathname:'/'
                    }}
                    />
                )
            }
        }

        />
    )

}
export default PrivateRouter;