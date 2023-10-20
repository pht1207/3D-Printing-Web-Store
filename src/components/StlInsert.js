import {StlViewer} from "react-stl-viewer";
import React, { useState, useEffect, useRef } from "react";
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

function StlInsert(props) {
    //https://www.npmjs.com/package/react-stl-viewer
    const [userFile, setUserFile] = useState();
    const [STLPresent, setSTLPresent] = useState(false);
    const [serverFileID, setServerFileID] = useState(false);
    const [hideUpload, setHideUpload] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [GCodeParsed, setGCodeParsed] = useState(false);
    const [returnedGCode, setReturnedGCode] = useState();
    const [GCodeCost, setGCodeCost] = useState();
    const [selectedQuality, setSelectedQuality] = useState("HQ");

    const [errorCode, setErrorCode] = useState("");
    const [errorEncountered, setErrorEncountered] = useState(false);


    const fileInputRef = useRef(null);
    const fileSubmitRef = useRef(null)

    const url = "https://print.parkert.dev/backend/"+serverFileID+"/"+serverFileID+".stl";
    
    const style = {
      height: "100%",
  }

  function fileInputted(e){
    setErrorCode("")
    setErrorEncountered(false);
    const file = e.target.files[0];
    //Checks if the file is a .stl file
    const fileExtension = getFileExtension(file.name)
    if(fileExtension === "stl") {
      setSTLPresent(true)
      setUserFile(e.target.files[0].value);
    //Dispatches a submit event so that the onSubmit function can be executed
      const event = new Event('submit', {
        bubbles: true,
        cancelable: true
      });
      fileSubmitRef.current.dispatchEvent(event);
    }
    else{
      setSTLPresent(false);
      setErrorEncountered(true);
      setErrorCode("Ensure you select a .stl file")
    }

    //Gets the file extension and checks it on the client side
    function getFileExtension(fileName){
      const fileExtension = fileName.split('.').pop().toLowerCase();
      return fileExtension;
    }

  }

  async function uploadFile(e){
    e.preventDefault();
    await setHideUpload(true);
    const formData = new FormData(e.target);
    const resolve = await axios.post('https://print.parkert.dev/backend/upload/stl', formData)
    console.log(resolve);
    console.log(resolve.data);
    await setServerFileID(resolve.data);
    await setIsUploaded(true);

    //This is where we send data to the server telling it to turn the .stl into gcode. Some sort of form with parameters regarding quality, node server will pick somehow, probably just have a bunch of if statements for simplicity.
    
  }

  function handleOptionChange(e){
    console.log(e.target.value)
    setSelectedQuality(e.target.value)
  }



    async function parseGCodeWithOptions(e){
      console.log(e);
      const sentData ={ serverFileID: serverFileID, selectedQuality: selectedQuality}
      e.preventDefault();
      const resolve = await axios.post('https://print.parkert.dev/backend/gcodeWithOptions', sentData, {
        headers: {
          'Content-Type': 'application/json', // Set the content type to plain text
        },
      })
      const code = resolve.data.isParsed
      if(resolve.data.isParsed === "Successful"){
        setGCodeCost(resolve.data.cost);
        setReturnedGCode(resolve.data)  
        setGCodeParsed(true); 
      }
      else{
        console.log("Error encountered while parsing of gcode file")

        setErrorEncountered(true);
        setErrorCode(resolve.data.isParsed)

        //resets the interaction window
        setUserFile();
        setSTLPresent(false);
        setServerFileID(false);
        setHideUpload(false);
        setIsUploaded(false);
        setGCodeParsed(false);
        setReturnedGCode();
        setGCodeCost();
      }
      console.log("isParsed: "+resolve.data.isParsed)
      /*
      setGCodeCost(resolve.data.cost);
      setReturnedGCode(resolve.data)  
      setGCodeParsed(true); */
    }



    async function cartAdder(){
      //Adds the new gcode to the cart
      props.setCart([...props.cart, returnedGCode])
      //Resets the whole component
      setUserFile();
      setSTLPresent(false);
      setServerFileID(false);
      setHideUpload(false);
      setIsUploaded(false);
      setGCodeParsed(false);
      setReturnedGCode();
      setGCodeCost();
  
    }


    const handleSelectFileClick = () => {
      fileInputRef.current.click();
  };




const GCodeForm = (
  <div className="GCodeForm" onSubmit={parseGCodeWithOptions}>
    Change the quality of your print:
    <form onSubmit={parseGCodeWithOptions}>
      <select id="dropdown" onChange={handleOptionChange}>
=         <option value="VHQ" >Very High Quality (.12mm Layer Height)</option>
        <option value="HQ" selected>High Quality (.20mm Layer Height)</option>
        <option value="MQ">Medium Quality (.28mm Layer Height)</option>
      </select>
      <br/>
      <button type="submit">Prepare your file to be printed</button>
      {GCodeParsed ?  <button onClick={cartAdder}>add to cart</button> : <></>}
    </form>
  </div>
  )




    //If I ever want to let them drag and drop, I need an 'onDrop' attribute added to one of the HTML elements
  
    return (
      <div className="interactionWindow">
      {/*This section is for showing the file input for the .stl*/}
      {!GCodeParsed ? <>{!hideUpload ? <div className="uploadField">
        <form onSubmit={uploadFile} onClick={handleSelectFileClick} ref={fileSubmitRef}>
        <p>Enter your .stl file here</p>
            <input type="file" onChange={fileInputted} name="file" style={{ display: 'none' }} ref={fileInputRef}></input>
            {STLPresent ? <button type="submit"/> : <>{errorEncountered ? <> There was an error processing your file, re-submit it. Error message: {errorCode} </> : <></>} </>}
        </form> 
        </div>
        :
        <></>
      }



      {/*This section is for showing the stlviewer component or hiding it*/}
      {serverFileID ?
      <div className="STLViewerDiv">
      <StlViewer
          modelProps={{color: "rgb(199,255,255)"}}
          style={style}
          orbitControls
          url= {url}
        />
      </div>
      : 
      <></>
      }
          {/*isUploaded? Show gcode form, or show the gcode viewer and gcodeform*/}
          {isUploaded ? 
           <>
            {GCodeForm}
            </>: <></>}
          
          {/*{isUploaded ? <button onClick={parseGCode}>Prepare your file?</button> : <></>}*/}
          </>
          : <> 
          <div className="GCodeSection">
            <GCodeViewerComponent id={serverFileID}/>
            <p className="printNotice">*This is a representation of how your print will look, it will likely be manually adjusted to a better orientation if possible</p>
            <br></br>
            <p className="priceListed">Price: ${GCodeCost}</p>
          </div>
          <div className="ChangePrint">
            <h4>Change your print:</h4>
            {GCodeForm}
          </div>
          </>
      }
      </div>
    );
  }
  
  export default StlInsert;
  