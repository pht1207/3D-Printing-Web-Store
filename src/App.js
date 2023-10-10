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
        <div className='mainDiv'>
        <Cart cart={cart} setCart={setCart} pseudoCart={pseudoCart} setPseudoCart={setPseudoCart}/>
        <StlInsert cart={cart} setCart={setCart}/>
        </div>
        <div className='FAQ'>
          <h4>Things to note about this service:</h4>
          <br/>
          <ul>
            <li>There is no post-processing performed on any these parts, you will be responsible for removing support material, sanding, painting, etc.</li>
            <br/>
            <li>The representation provided above is only an example of what your finished product will look like, your item will be placed in the best orientation seen by the print operator, so if it is automatically placed upside-down or something, don't worry.</li>
            <br/>
            <li>When selecting PETG filament, there will be inevitable strings that appear on the model. The increased strength to heat and durability come at the expense of this stringing. They can easily be removed by sanding them off.</li>
          </ul>
        </div>
      </Elements>
    </div>
  );
}

export default App;
