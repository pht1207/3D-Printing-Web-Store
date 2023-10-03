import React, { useState, useEffect } from 'react';
import "./Cart.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Example using Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import BuyButton from './BuyButton';
library.add(faShoppingCart);



function Cart(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [mouseEnter, setMouseEnter] = useState(false);
    const [emptyCart, setEmptyCart] = useState(true);

    function toggleDropdown(){
        setIsDropdownOpen(!isDropdownOpen);
      }

      //Sets cart empty or not
      useEffect(() => { 
        if(props.cart.length < 1){
            setEmptyCart(true);
        }
        else{
            setEmptyCart(false);
        }
      },[props.cart])

    //https://fontawesome.com/icons/cart-shopping?f=classic&s=solid&an=flip
      return (
        <div className='cartDiv'>
        <div className='cartButton' onClick={toggleDropdown}><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Your Cart</div>


         <ul className='dropdownList'>
            {props.cart.map((item, index) => (
            <li key={index} className='cartItem'>{item}</li>
            ))
            }
          <li><BuyButton cart={props.cart} setCart={props.setCart}/></li>
        </ul>
        </div>
      );
    }
    
    export default Cart;
    