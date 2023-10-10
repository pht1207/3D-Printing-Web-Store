import React, { useState, useEffect } from 'react';
import "./Cart.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Example using Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import BuyButton from './BuyButton';
library.add(faShoppingCart);



function Cart(props) {
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
        <>{/* This is the instructions that will show if the cart is empty*/}
        <div>
          <h2>Get an instant quote</h2>
          <br/>
          <p>Upload your .stl file and get a quote for pricing</p>
          <br/>
          <p>Click on the "Choose File" button on the right side to upload your .stl file</p>
        </div>
        </>
         :
         <>{/* This is the cart that will show if the cart is not empty*/}
         <div className='cartButton'><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Your Cart</div>
 
          <ul className='cartList'>
             {props.cart.map((item, index) => (
             <li key={index} className='cartItem'>{index+1}: File Name: {item.file} Price: ${item.cost}</li>
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
    