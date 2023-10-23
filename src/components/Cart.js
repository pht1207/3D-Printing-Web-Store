import React, { useState, useEffect } from 'react';
import "./Cart.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Example using Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
          <h2>Get an instant quote</h2>
          <br/>
          <p>Upload your .stl file and get a quote for pricing</p>
          <br/>
          <p>Click on the "Enter your .stl file here" button on the right side to upload your .stl file</p>
          <br/>
          <p>Select your desired quality, then prepare it to be printed!</p>
        </>


         :


         <div className='cartWindow'>{/* This is the cart that will show if the cart is not empty*/}
          <div className='cartTitle'><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Your Cart</div>
 
          <ul className='cartList'>
             {props.cart.map((item, index) => (
             <li key={index} className='cartItem'> {/*index+1 Taking this out for right now, no point in having them numbered: Item: */}
              {item.file} &nbsp;&nbsp; Price: ${item.cost}
              {/*Make some trashcan icon to remove items, I tried w/ fontawesome but couldnt get it to appear, could not say why*/}
             </li>
             ))
             }
           <li className='BuyButton'><BuyButton cart={props.cart} setCart={props.setCart}/></li>
         </ul>
         </div>            
          }

          <br/>
          <div className='FAQ'>
          
          <h2>Things to note about this service:</h2>
          <br/>
          <ul>
            <li>There is no post-processing performed on any these parts, the purchaser is responsible for removing support material, sanding, painting, etc.</li>
            <br/>
            <li>Models are printed using a consumer grade FDM printer.</li>
            <br/>
            <li>All models are printed using white PETG filament.</li>
          </ul>
        </div>

          </div>
      );
    }
    
    export default Cart;
    