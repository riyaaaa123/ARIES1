import React from 'react'
import "./footer.css"

const Footer = () => {
    const year = new Date().getFullYear();
    console.log(year);
  return (
    <div>
        <footer>
            {/* <div className='footer_container'>
                <div className='footr_details_one'>
                    <h3>Get to Know Us</h3>
                    <p>About Us</p>
                    <p>Career</p>
                    <p>  Press Releases</p>
                    <p> Amazon Cares </p>
                </div>
                <div className='footr_details_one '>
                    <h3>Connect with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p> Instagram</p>
                </div>
                <div className='footr_details_one forres'>
                    <h3>Connect with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p> Instagram</p>
                   
                </div>
                <div className='footr_details_one forres'>
                    <h3>Connect with Us</h3>
                    <p>Facebook</p>
                    <p>Twitter</p>
                    <p> Instagram</p>
                   
                </div>
            </div> */}
            <div className='lastdetails'>
                <img src='./let-s-shop-logo-1593575280.jpg' alt='logo'/>
                <p>Thank you for visiting us! We hope we would be able to help you in the most beneficial way :D </p><p className='two'> © 1996-{year}, letsshop.com, Inc. or its affiliates</p>
            </div>
        </footer>
      
    </div>
  )
}

export default Footer
