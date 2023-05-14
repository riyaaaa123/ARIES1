import React, { useState, useEffect } from "react";
import "./buynow.css";
import { Divider } from "@mui/material";
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";
import CircularProgress from "@mui/material/CircularProgress";

const Buynow = () => {
  const [cartdata, setCartdata] = useState([]);
  console.log(cartdata);
  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res.status !== 201) {
      console.log("error");
    } else {
      setCartdata(data.carts);
    }
  };
  useEffect(() => {
    getdatabuy();
  }, []);
  return (
    <>
      {cartdata.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p> Select All items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />
              {cartdata.map((e, k) => {
                return (
                  <>
                    <div className="item_containert" key={k}>
                      <img src={e.cart.detailUrl} alt="" />
                      <div className="item_details">
                        <h3>
                        {e.cart.title.shortTitle}
                        </h3>
                        <h3>{e.cart.title.longTitle}</h3>
                        <h3 className="diffrentprice">₹4049</h3>
                        <h5 className="unusuall">Usually dispatched in 8 days</h5>
                        <h5> Eligible for Free Shipping</h5>
                        {/* <img
                          src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                          alt="logo"
                        /> */}
                        <Option deletedata={e.cart._id} get={getdatabuy} />
                      </div>
                      <h3 className="item_price">{e.cart.price.cost}</h3>
                    </div>
                    <Divider />
                  </>
                );
              })}

             
              <Subtotal item={cartdata} />
            </div>
            <div className="right_buy">
              <Right  item={cartdata} />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
       {!cartdata ?(<div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>):""}
    </>
  );
};

export default Buynow;
