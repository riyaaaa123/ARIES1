import React, { useState , useContext} from "react";
import "./signin.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from "../context/ContextProvider";

const SignIn = () => {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });
  console.log(logdata);

  const { account, setAccount } = useContext(LoginContext);

  const adddata = (e) => {
    const { name, value } = e.target;
    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };
  const senddata = async (e) => {
    e.preventDefault();
    const {email,password}=logdata;
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,password
      }),
    });
    const data=await res.json();
    console.log(data);
    if (res.status === 400 || !data) {
      console.log("invalid details");
      toast.error("Invalid Details 👎!", {
          position: "top-center"
      });
  } 
  else{
    console.log("data valid");
    setAccount(data);
    toast.success("valid user",{
      position:"top-center"
    })
    setData({...logdata,email:"",password:""});
  }
} 



  return (
    <>
      <section>
        <div className="container">
          {/* <div className="sign_header">
            <img src="./let-s-shop-logo-1593575280.jpg" alt="amazonlogo" />
          </div> */}
          <p className="animated">Login</p>
</div>
          
            <form method="POST">
              
              {/* <div className="form_data"> */}
                {/* <label htmlFor="email">Email</label> */}
                <input
                  type="email"
                  placeholder="Enter your Email"
                  onChange={adddata}
                  value={logdata.email}
                  name="email"
                  id="email"
                />
              {/* </div> */}
              {/* <div className="form_data"> */}
                {/* <label htmlFor="password">Password</label> */}
                <input
                  type="password"
                  onChange={adddata}
                  value={logdata.password}
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                />
              {/* </div> */}
              <button className="submit" id="Submit" onClick={senddata}>
                Log In
              </button>
            </form>
        
          <div className="signin">
            <p>New To LetsShop?</p>
            <NavLink to="/register">
            SignUp
            </NavLink>
          </div>
          <ToastContainer/>
        
      </section>
    </>
  );
};

export default SignIn;
