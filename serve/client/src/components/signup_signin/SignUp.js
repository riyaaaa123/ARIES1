import React, { useState } from "react";
import "./signin.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [udata, setudata] = useState({
    fname: "",
    email: "",
    phoneno: "",
    password: "",
    cpassword: "",
  });
  // const adddata =(e)=>{
  //     const {name,value}= e.target;
  //     setudata(()=>{
  //     return{
  //         ...udata,
  //        [ name]:value,    }
  //     })}
  const senddata = async (e) => {
    e.preventDefault();
    const { fname, email, phoneno, password, cpassword } = udata;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        email,
        phoneno,
        password,
        cpassword,
      }),
    });
    const data=await res.json();
   // console.log(data);
   if(res.status===422||!data){
    //alert("no data added");
    toast.warn("invalid details",{
        position:"top-center",
    })
   }
   else if(res.status===410){
    //alert("no data added");
    toast.warn("account already exists",{
        position:"top-center",
    })
   }
   else if(res.status===412){
    //alert("no data added");
    toast.warn("passwords dont match",{
        position:"top-center",
    })
   }
   else {
    //alert("data added successfully");
    toast.success("data successfully added,Login to Continue",{
        position:"top-center",
    })
    setudata({
        ...udata, fname: "", email: "",
        phoneno: "", password: "", cpassword: ""
    });
   }
  };
  console.log(udata);
  return (
    <>
      <section>
        <div className="container">
        <p>Register&nbsp;</p><p className="animated">now!</p>
    </div>
            <form action="POST">
              {/* <div className="form_data"> */}
                {/* <label htmlFor="fname">Your name</label> */}
                <input
                  type="text"
                  name="fname"
                  required
                  placeholder="Enter your Name"
                  onChange={(e) =>
                    setudata({
                      ...udata,
                      fname: e.target.value,
                    })
                  }
                  value={udata.fname}
                  id="fname"
                />
              {/* <div className="form_data"> */}
                {/* <label htmlFor="email">Email</label> */}
                {
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    // onChange={adddata}
                    onChange={(e) =>
                      setudata({
                        ...udata,
                        email: e.target.value,
                      })
                    }
                    value={udata.email}
                    id="email"
                  />
                }
              {/* <div className="form_data"> */}
                {/* <label htmlFor="phoneno">Phone Number</label> */}
                <input
                  type="number"
                  name="phoneno"
                  // onChange={adddata}
                  placeholder="Enter your Mobile No"
                  onChange={(e) =>
                    setudata({
                      ...udata,
                      phoneno: e.target.value,
                    })
                  }
                  value={udata.phoneno}
                  id="phoneno"
                />
            
              {/* <div className="form_data"> */}
                {/* <label htmlFor="password">Password</label> */}
                <input
                  type="password"
                  name="password" //onChange={adddata}
                  onChange={(e) =>
                    setudata({
                      ...udata,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter your password(atleast 6 characters)"
                  value={udata.password}
                  id="password"
                />
              
              {/* <div className="form_data"> */}
                {/* <label htmlFor="cpassword">Confirm Password</label> */}
                <input
                  type="password"
                  name="cpassword" //onChange={adddata}
                  onChange={(e) =>
                    setudata({
                      ...udata,
                      cpassword: e.target.value,
                    })
                  }
                  placeholder=" enter Confirm Password(atleast 6 characters)"
                  value={udata.cpassword}
                  id="cpassword"
                />
              {/* </div> */}
              <button className="submit" id="Submit" onClick={senddata}>
                Create Account
              </button>
            
            <div className="signup">
              <p>Already have an account?</p>
              <NavLink to="/login">SignIn</NavLink>
            </div>
            </form>
          <ToastContainer/>
      
      </section>
    </>
  );
};

export default SignUp;
