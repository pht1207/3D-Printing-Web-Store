import React, { useState, useEffect, useRef } from 'react';
import "./Cart.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Example using Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteIcon from '@mui/icons-material/Delete';
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


      function removeFromCart(e){
        console.log(e)
        const removedIndex = e
        console.log(removedIndex)
        let newCart = [];
        for(let i = 0; i < props.cart.length; i++){
          if(props.cart[i] !== props.cart[removedIndex]){
            newCart.push(props.cart[i]);
          }
        }
        props.setCart(newCart);
      }

      function fileNameDisplayer(fileName){
        if(fileName.length >= 12){
          return("File: " + fileName.substring(0,12)+"...stl")
        }
        else{
          return ("File: " + fileName);
        }
      }

      function DownloadExampleSTL(){
        const anchor = document.createElement('a');
        anchor.href = '/20mm_cube.stl';
        anchor.download = "20mm_cube.stl"
        anchor.click();
        anchor.remove();
      }





    //https://fontawesome.com/icons/cart-shopping?f=classic&s=solid&an=flip
      return (
        <div className='cartDiv'>
        {emptyCart ? 
        <div className='InstructionsDiv'>{/* This is the instructions that will show if the cart is empty*/}
          <h2>Get an instant quote</h2>
          <ul>
            <li>Upload your STL file and get a quote for pricing.</li>
            <li>Click on the "Enter your STL file here" button on the right side to upload your STL file.</li>
            <li>Select your desired quality, then prepare it to be printed!</li>
          </ul>
        </div>


         :


         <div className='cartWindow'>{/* This is the cart that will show if the cart is not empty*/}
          <div className='cartTitle'><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> Your Cart</div>
          <ul className='cartList'>
             {props.cart.map((item, index) => (
             <li key={index} className='cartItem'>
                <div className='cartItemInfo'>
                  <p>{fileNameDisplayer(item.file)} </p>
                  <p>Price: ${item.cost}</p>
                </div>
                <DeleteIcon value={index} onClick={() => removeFromCart(index)}/>
             </li>
             ))
             }
           <li className='BuyButton'><BuyButton cart={props.cart} setCart={props.setCart}/></li>
         </ul>
         </div>            
          }

          <br/>
            <div className='ExampleSTLButton'>
              <h2>Download an example STL file to try the app:</h2>
              <button onClick={DownloadExampleSTL}>Example STL File</button>
            </div>
          <br/>

          <div className='FAQ'>
          <h2>Things to note about this service:</h2>
          <br/>
          <ul>
            <li>This website is in test mode, payments/orders will not be fullfilled, the website is incomplete, it is more of a concept than a product.</li>
            <li>The navigation bar is not functional because I have not implemented it yet. I am focusing on other projects, I rather wanted the main idea of this project to be complete, which it is.</li>
            <li>There is no post-processing performed on any these parts, the purchaser is responsible for removing support material, sanding, painting, etc.</li>
            <li>Models are printed using a consumer grade FDM printer.</li>
            <li>All models are printed using white PETG filament.</li>
          </ul>
        </div>

          </div>
      );
    }
    
    export default Cart;
    