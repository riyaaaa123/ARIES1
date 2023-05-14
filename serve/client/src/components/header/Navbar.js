import { React, useContext, useEffect, useState } from "react";
import "./Navbar.css";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { LoginContext } from "../context/ContextProvider";
import { useSelector } from "react-redux";
// import { useHistory} from "react-router";
import { ToastContainer,toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Rightheader from "./Rightheader";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  console.log(account.carts);
  const [anchorEl, setAnchorEl] = useState(null); 
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const [dropen,setDropen]= useState(false);




  const [text, setText] = useState("");
  console.log(text);
  const [liopen, setLiopen] = useState(true);
  const { products } = useSelector((state) => state.getproductsdata);
  const getText = (items) => {
    setText(items);
    setLiopen(false);
  };
  // console.log(account.carts.cart);

  const history = useNavigate();

  const handleCartClick = () => {
    if (account) {
      history("/buynow");
    } else {
      history("/login");
    }
  };
  const getdetailvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("valid user");
      setAccount(data);
    }
  };
  const handleopen=()=>{
    setDropen(true);
  }
  const handledrclose = () => {
    setDropen(false)
}

const logoutuser = async () => {
  const res2 = await fetch("/logout", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data2 = await res2.json();
  console.log(data2);
  if (res2.status !== 201) {
    console.log("error");
  } else {
    console.log("valid user");
    toast.success("logged out successfully",{
      position:"top-center"
    })
  
    setAccount(false);
    history("/");
  }
};
  useEffect(() => {
    getdetailvaliduser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburgur" onClick={handleopen} >
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer  open={dropen} onClose={handledrclose }>
            <Rightheader Logclose={handledrclose} logoutuser={logoutuser }/>
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              {" "}
              <img src="./let-s-shop-logo-1593575280.jpg " alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              onChange={(e) => getText(e.target.value)}
              placeholder="Search your products"
              name=""
              id=""
            />
            <div className="search_icon">
              <SearchIcon id="search" />
            </div>
            {/* search_filter */}
            {text && (
              <List className="extrasearch" hidden={liopen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((product) => (
                    <ListItem>
                      <NavLink
                        to={`/getproductsone/${product.id}`}
                        onClick={() => setLiopen(true)}
                      >
                        {" "}
                        {product.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            <NavLink to="/login">signin</NavLink>
          </div>
          {/* <div className="cart_btn" onClick={handleCartClick}>
            <Badge badgeContent={0} color="primary">
              <ShoppingCartIcon id="icon" />
            </Badge>
            <p>Cart</p>
          </div> */}
          <div className="cart_btn">
            {account ? (
              <NavLink to="/buynow">
                <Badge badgeContent={account.carts.length} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            ) : (
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
            )}

            <ToastContainer />

            <p>Cart</p>
          </div>

          {account ? (
            <Avatar className="avtar2"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>{account.fname[0].toUpperCase()}</Avatar>
          ) : (
            <Avatar className="avtar"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}></Avatar>
          )}
          
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       
        <MenuItem onClick={handleClose}>My account</MenuItem>
        {
          account ?(<MenuItem onClick={handleClose} onClick={logoutuser}><LogoutIcon/>Logout</MenuItem>):""
        }
        
      </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
