import React, { useState } from 'react';
import "./NavigationBar.css"

function NavigationBar(props) {

    
      return (
        <nav>
            <ul>
                <li className='businessTitle'>Parker's Prints</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>FAQ</li>



            </ul>
        </nav>
      );
    }
    
    export default NavigationBar;
    