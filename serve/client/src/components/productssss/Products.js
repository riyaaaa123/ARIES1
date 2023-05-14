import React ,{ useEffect } from "react";
import { Divider } from "@mui/material";
 import "./product.css";
import { NavLink } from "react-router-dom";
import { getProducts } from "../redux/actions/Actions";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
    const { products } = useSelector((state) => state.getproductsdata);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (

    <div className="buynow_section">
      <div className="buy_container" >
        <div className="left_buy" products={products}>
          <h1>All Shopping items</h1>
          <p> Have a look on all the products together!</p>
          <span className="leftbuyprice">Price</span>
          <Divider />
          {products.map((e)=>{
            return(
                <>
                <NavLink to={`/getproductsone/${e.id}`}>
                <div className="item_containert"  >
            <img
              src={e.url}
              alt=""
            />
            <div className="item_details">
              <h3>{e.title.shortTitle}</h3>
              <h3>{e.title.longTitle}</h3>
              <h3 className="diffrentprice">₹{e.price.cost}</h3>
              <h5 className="unusuall">Usually dispatched in 8 days</h5>
              <h5> Eligible for Free Shipping</h5>
              
              
            </div>
            <h3 className="item_price">₹{e.price.cost}</h3>
          </div>
          </NavLink>
          <Divider/>
          </>
           

            )
           
          })}
          
         
        </div>
      </div>
    </div>
  );
};

export default Products;
