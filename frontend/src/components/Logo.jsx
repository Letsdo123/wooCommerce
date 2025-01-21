import React from 'react'
import logo from "../assets/images/wooCommerce_logo.png";
function Logo({width,height}) {
    return (
        <img
        src={logo}
        alt="Logo"
        className="h-16"
      />  
    )
}

export default Logo