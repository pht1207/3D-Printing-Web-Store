import {StlViewer} from "react-stl-viewer";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import GCodeViewerComponent from "./GCodeViewerComponent";
import './StlInsert.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement } from "@stripe/react-stripe-js";




//https://stripe.com/docs/stripe-js/react

//https://threejs.org/examples/misc_exporter_stl.html

//https://sbcode.net/threejs/loaders-stl/


//ThreeJS app for organizing stls?
//https://threejs.org/editor/

//Eventualy use react-three-fiber to show the stl and maybe gcode too.

function StlInsert() {
    //https://www.npmjs.com/package/react-stl-viewer
    const [userFile, setUserFile] = useState();
    const [STLPresent, setSTLPresent] = useState(false);
    const [serverFileID, setServerFileID] = useState(false);
    const [hideUpload, setHideUpload] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [GCodeParsed, setGCodeParsed] = useState(false);
    const [GCodeCost, setGCodeCost] = useState();
    const [stripePaymentLink, setStripePaymentLink] = useState();

    



    const url = "http://192.168.1.127:5005/"+serverFileID+"/"+serverFileID+".stl";
    
    const style = {
      top: 0,
      left: 0,
      width: '60vw',
      height: '40vh',
  }

  function fileInputted(e){
    const file = e.target.files[0];
    if(file) {
      setSTLPresent(true)
    }
    console.log('result' + e.target.result)
    console.log(e.target.files[0]);
    setUserFile(e.target.files[0].value);
    console.log(userFile);
  }

  async function uploadFile(e){
    e.preventDefault();
    setHideUpload(true);
    const formData = new FormData(e.target);
    //formData.append('file', userFile)
    //changed to e instead of formData
    const resolve = await axios.post('http://192.168.1.127:5005/upload/stl', formData)
    console.log(resolve);
    console.log(resolve.data);
    await setServerFileID(resolve.data);
    setIsUploaded(true);

    //This is where we send data to the server telling it to turn the .stl into gcode. Some sort of form with parameters regarding quality, node server will pick somehow, probably just have a bunch of if statements for simplicity.
    
  }

  function handleOptionChange(){

  }








  const GCodeForm = (
    <div className="GCodeForm">
      <form>
      <select id="dropdown" onChange={handleOptionChange}>
        <option value="">Select an option...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>

      <button type="submit">Submit</button>      </form>
    </div>

    )

    async function parseGCode(){

      const myString = serverFileID;
      const resolve = await axios.post('http://192.168.1.127:5005/gcode', myString, {
        headers: {
          'Content-Type': 'text/plain', // Set the content type to plain text
        },
      })
      console.log(resolve);
      console.log(resolve.data)
      if(resolve.data.isParsed === "Successful"){
        console.log("wahdskjhaldkjfhadskljfhalkjdshllkhlhk")
      }
      setGCodeCost(resolve.data.cost);
      setStripePaymentLink(resolve.data.paymentLink)
      
      setGCodeParsed(true); 
    }


  
    return (
      <div className="interactionWindow">
      {!GCodeParsed ? <>{!hideUpload ? <div className="uploadField">
        <p>Enter your .stl file here</p>
        <form onSubmit={uploadFile}>
            <input type="file" onChange={fileInputted} name="file"></input>
            <br/>{STLPresent ? <label><button type="submit"></button>Submit this file</label> : <p>click the button above to select an stl file</p>}
        </form> 
        </div>
        :
        <div className="uploadField"></div>
      }


        {serverFileID?<StlViewer
            modelProps={{color: "rgb(199,255,255)"}}
            style={style}
            orbitControls
            url= {url}
          />: <></>}
          {isUploaded ?
           <>
           <h4>Change defualt settings for your print: </h4>
            {GCodeForm}
            </>: <></>}
          
          {isUploaded ? <button onClick={parseGCode}>Prepare your file?</button> : <></>}
          </>
          : <> 
          <div className="gcodeViewer">
            <GCodeViewerComponent id={serverFileID}/>
            <p>Price before tax and shipping: ${GCodeCost}</p>
          </div>
          <h4>Change your print:</h4>
          {GCodeForm}
          <p>{stripePaymentLink}</p>
          </>
}
      </div>
    );
  }
  
  export default StlInsert;
  