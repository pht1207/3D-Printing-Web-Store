import React, { useState, useEffect } from 'react';
import "./Cart.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Example using Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import BuyButton from './BuyButton';
library.add(faShoppingCart);



function Cart(props) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [emptyCart, setEmptyCart] = useState(true);


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
        {emptyCart ? 
        <>
        <div>
          <p>Click the upload file button or drag your .stl file to the right side of the window</p>
        </div>
        </>
         :
         <>
         <div className='cartButton'><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Your Cart</div>
 
          <ul className='cartList'>
             {props.cart.map((item, index) => (
             <li key={index} className='cartItem'>{index+1}: File Name: {item} Price: {"test"}</li>
             ))
             }
           <li><BuyButton cart={props.cart} setCart={props.setCart}/></li>
         </ul>
         </>            
          }
          </div>
      );
    }
    
    export default Cart;
    