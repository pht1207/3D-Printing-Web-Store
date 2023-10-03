import React, { useState } from 'react';
import "./NavigationBar.css"
import Cart from './Cart';

function NavigationBar(props) {

    
      return (
        <nav>
            <ul>
                <li>Parker's Prints</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li><Cart cart={props.cart} setCart={props.setCart}/></li>



            </ul>
        </nav>
      );
    }
    
    export default NavigationBar;
    