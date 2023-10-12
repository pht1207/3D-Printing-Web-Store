import React, { useState, useEffect } from 'react';
import "./NavigationBar.css"
import Cart from './Cart';
import axios from 'axios';


function BuyButton(props) {
    const [buyLinkReceived, setBuyLinkReceived] = useState(false);
    const [stripePaymentLink, setStripePaymentLink] = useState();


    //Brings user to the stripe payment page
    useEffect(() => {
        if(stripePaymentLink){
        //window.location.href = props.stripePaymentLink;
        window.open(stripePaymentLink)
        window.location.reload();
        }
        }, [buyLinkReceived]);

    async function buyFunction(){
        const resolve = await axios.post('https://print.parkert.dev:5005/paymentLinkCreator', props.cart, {
          headers: {
            'Content-Type': 'application/json', // Set the content type to plain text
          },
        })
        await setStripePaymentLink(resolve.data)
        await setBuyLinkReceived(true);
      }
      

      return (
            <button onClick={buyFunction}>Buy Here</button>
      );
    }
    
    export default BuyButton;
    