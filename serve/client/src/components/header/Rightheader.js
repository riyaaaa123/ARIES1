import React, { useContext } from 'react'
import Avatar from "@mui/material/Avatar";
import { LoginContext } from '../context/ContextProvider';
import { NavLink } from 'react-router-dom';
import { Divider } from '@mui/material';
import "./rightheader.css" ; 
import LogoutIcon from '@mui/icons-material/Logout';
const Rightheader = ({Logclose,logoutuser }) => {
    const { account, setAccount } = useContext(LoginContext);
  return (
    <>
    <div className='rightheader'>
        <div className='right_nav'>
        {account ? (
            <Avatar className="avtar2">{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}
          
          { account ? (< h3>Hello,{account.fname.toUpperCase()} </h3> ):""}
          

        </div>
        <div className='nav_btn' onClick={()=>Logclose()}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Shop by Category</NavLink>
            <Divider  style={{width:"100%",marginLeft:"-20px"}}/>
            <NavLink to="/Contactus">Contact US</NavLink>
            <NavLink to="/Aboutus">About US</NavLink>
            <Divider style={{width:"100%",marginLeft:"-20px"}}/>
            <div className='flag'>
            {
                account? ( <NavLink to="/buynow">Your Orders</NavLink>):(<NavLink to="/login">Your Orders</NavLink>)
            }
            </div>
           
            {
              account ?(
                <div className='flag'>
                <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 onClick={() => logoutuser ()} style={{ cursor: "pointer", fontWeight: 500 }}>Log Out</h3>
                            </div>
              ):(
                <NavLink to="/login">Login</NavLink>
              )
            }
             
            
             
            
            
            

        </div>
    </div>
    
    
    </>
      
   
  )
}

export default Rightheader
