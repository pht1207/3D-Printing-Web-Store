import React, { useState, useEffect } from 'react';
import "./NavigationBar.css"
import Cart from './Cart';
import axios from 'axios';


function BuyButton(props) {
    const [buyLinkReceived, setBuyLinkReceived] = useState(false);

    useEffect(() => {
        if(props.stripePaymentLink){
        window.location.href = props.stripePaymentLink;
        }
        }, [buyLinkReceived]);

    async function buyFunction(){
        const resolve = await axios.post('http://192.168.1.127:5005/paymentLinkCreator', props.cart, {
          headers: {
            'Content-Type': 'application/json', // Set the content type to plain text
          },
        })
        console.log(resolve)
        await props.setStripePaymentLink(resolve.data)
        await setBuyLinkReceived(true);
      }
      

      return (
            <button onClick={buyFunction}>Buy Here</button>
      );
    }
    
    export default BuyButton;
    