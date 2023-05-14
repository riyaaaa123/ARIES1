import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import CircularProgress from "@mui/material/CircularProgress";

const Cart = () => {
  const { id } = useParams("");
  const history = useNavigate("");
  const { account, setAccount } = useContext(LoginContext);

  //console.log(id);
  const [inddata, setInddata] = useState("");
  console.log(inddata);
  const getinddata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        // Accept: "application/json",
        "Content-Type": "application/json",
      },
      // credentials: "include"
    });

    const data = await res.json();
    //console.log(data);
    if (res.status !== 201) {
      alert("no data available");
    } else {
      console.log("ind mila hain");
      setInddata(data);
    }
  };
  useEffect(() => {
    setTimeout(getinddata,1000)
  }, [id]);
  const addtocart = async (id) => {
    const checkres = await fetch(`/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inddata,
      }),
      credentials: "include",
    });
    console.log(checkres);
    const data1 = await checkres.json(); //yaha pe gadbad haiiii
    console.log(data1);
    if (checkres.status !== 201 || !data1) {
      console.log("user invalid");
      alert("user invalid");
    } else {
      // alert("data added in your cart");
      history("/buynow");
      setAccount(data1);
    }
  };

  return (
    <div className="cart_section">
      {inddata && Object.keys(inddata).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={inddata.detailUrl} alt="" />
            <div className="cart_btn">
             { account ?(<button 
                className="cart_btn1"
                onClick={() => addtocart(inddata.id)}
              >
                Add to Cart
              </button>):(<button className="cart_btn1"><NavLink to="/login">Add to Cart</NavLink></button>)} 
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.shortTitle}</h3>
            <h4> {inddata.title.longTitle}</h4>
            <Divider />
            <h5 className="mrp"> M.R.P : ₹{inddata.price.mrp}</h5>
            <h5>
              {inddata.tagline} :{" "}
              <span style={{ color: "#B12704" }}> ₹{inddata.price.cost}</span>
            </h5>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                ₹{inddata.price.mrp - inddata.price.cost}(
                {inddata.price.discount})
              </span>
            </p>
            <div className="discount_box">
              <h5>
                {" "}
                Discount :{" "}
                <span style={{ color: "#111" }}>{inddata.discount}</span>
              </h5>
              <h4>
                Free Delivery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  {" "}
                  May 9-May 21{" "}
                </span>
                Details
              </h4>
              <p>
                Fastest Delivery :{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Tomorrow 11 AM
                </span>
              </p>
            </div>
            <p className="description">
              {" "}
              About the item :{" "}
              <span
                style={{
                  color: "#565659",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.4px",
                }}
              >
                {inddata.description}{" "}
              </span>
            </p>
          </div>
        </div>
      )}

      {!inddata ?(<div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>):""}
    </div>
  );
  }

export default Cart;
