import Navbar from "./components/header/Navbar";
import Newnav from "./components/newnavbar/Newnav";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/Footer";
import SignIn from "./components/signup_signin/SignIn";
import SignUp from "./components/signup_signin/SignUp";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buy/Buynow";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Aboutus from "./components/aboutuss/Aboutus";
import Contactus from "./components/contactus/Contactus";
import Products from "./components/productssss/Products";

function App() {
  const [data, setData] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  }, []);
  return (
    <>
      {data ? (
        <>
          <Navbar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Maincomp />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/getproductsone/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
            <Route path="/Aboutus" element={<Aboutus/>}/>
            <Route path="/Contactus" element={<Contactus/>}/>
            <Route path="/Products" element={<Products/>}/>
          </Routes>

          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default App;
