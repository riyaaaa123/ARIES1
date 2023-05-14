import React from "react";
import "./newnav.css";
import { NavLink } from "react-router-dom";

const Newnav = () => {
  return (
    <div className="new_nav">
      <div className="nav_data">
        <div className="left_data">
          {/* <p > <NavLink to="./" >Home</NavLink></p> */}
          <NavLink
            to="/"
            style={(isActive) => ({
              color: isActive ? "white" : "blue",
              textDecoration:"none"
            })}
          >Home</NavLink>
          <NavLink to="./Aboutus" style={(isActive) => ({
              color: isActive ? "white" : "blue",
              textDecoration:"none"
            })}>About US</NavLink>
          <NavLink to="./Contactus" style={(isActive) => ({
              color: isActive ? "white" : "blue",
              textDecoration:"none"
            })}> Contact US</NavLink>
          <NavLink to="./Products" style={(isActive) => ({
              color: isActive ? "white" : "blue",
              textDecoration:"none"
            })}> Products</NavLink>
        </div>
        <div className="right_data"></div>
      </div>
    </div>
  );
};

export default Newnav;
