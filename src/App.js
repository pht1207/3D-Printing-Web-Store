import './App.css';
import React, { useState, createContext } from 'react';
import StlInsert from './components/StlInsert';
import GCodeViewerComponent from './components/GCodeViewerComponent';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';



function App() {
const [cart, setCart] = useState([]);
const [stripePaymentLink, setStripePaymentLink] = useState();


//https://craftcloud3d.com/
//https://www.npmjs.com/package/react-gcode-viewer
const url = "https://storage.googleapis.com/ucloud-v3/6127a7f9aa32f718b8c1ab4f.gcode"

//Maybe this can be state for some sort of payment object? Like an array of the gcodes, send it to the server, pay for them all? Unsure as I don't know exactly how stripe works yet
//const [GCodes, setGCodes] = useState(false);

async function buyFunction(){
  const resolve = await axios.post('http://192.168.1.127:5005/paymentLinkCreator', cart, {
    headers: {
      'Content-Type': 'application/json', // Set the content type to plain text
    },
  })
  setStripePaymentLink(resolve.data.paymentLink.url)

}


// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NpxjLJfFzW7oP7E7ZgMgbkptO9Wx2PKjwylDyJ3j7HL7za7gyGaOwZB9MN2NUxTdfhCPOMgWW3bsU8VkAZg5k8R00ZbTjfAdr");


  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <h1>Print App</h1>
        <StlInsert cart={cart} setCart={setCart}/>
        <button onClick={buyFunction}>Buy Here</button>
        {stripePaymentLink}
      </Elements>
    </div>
  );
}

export default App;
