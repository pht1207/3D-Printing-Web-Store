import './App.css';
import React, { useState, createContext } from 'react';
import StlInsert from './components/StlInsert';
import GCodeViewerComponent from './components/GCodeViewerComponent';
import NavigationBar from './components/NavigationBar';
import Cart from './components/Cart';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from 'axios';



function App() {
const [cart, setCart] = useState([]);
const [pseudoCart, setPseudoCart] = useState([])
const [stripePaymentLink, setStripePaymentLink] = useState();


//https://craftcloud3d.com/
//https://www.npmjs.com/package/react-gcode-viewer
const url = "https://storage.googleapis.com/ucloud-v3/6127a7f9aa32f718b8c1ab4f.gcode"


// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NpxjLJfFzW7oP7E7ZgMgbkptO9Wx2PKjwylDyJ3j7HL7za7gyGaOwZB9MN2NUxTdfhCPOMgWW3bsU8VkAZg5k8R00ZbTjfAdr");


  return (
    <div className="App">
      <NavigationBar cart={cart} setCart={setCart} pseudoCart={pseudoCart} setPseudoCart={setPseudoCart}/>
      <Elements stripe={stripePromise}>
      <h1>Print App</h1>
        <div className='mainDiv'>
        <Cart cart={cart} setCart={setCart} pseudoCart={pseudoCart} setPseudoCart={setPseudoCart}/>
        <StlInsert cart={cart} setCart={setCart}/>
        </div>
        <h4>How long it will be until your order can be started (Back-order time): </h4>
      </Elements>
    </div>
  );
}

export default App;
