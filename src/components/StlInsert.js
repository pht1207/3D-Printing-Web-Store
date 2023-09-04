import {StlViewer} from "react-stl-viewer";
import React, { useState } from "react";
import axios from 'axios';


//I probably need to ditch stlviewer-react or whatever and go with three.js
//it is what github uses to display stl models on their shit and has way many more things than react-stl-viewer
//https://sbcode.net/threejs/loaders-stl/
//https://github.com/CreativeTools/3DBenchy/blob/master/Single-part/3DBenchy.stl

function StlInsert() {
    //https://www.npmjs.com/package/react-stl-viewer
    const [userFile, setUserFile] = useState("https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl");
    const [STLPresent, setSTLPresent] = useState(false);

    const url = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"
    const url1 = './Neptune_4_drawer.stl'
    
    const style = {
      top: 0,
      left: 0,
      width: '100vw',
      height: '60vh',
  }

  function fileInputted(e){
    const file = e.target.files[0];
    if(file) {
      setSTLPresent(true)

    }
    console.log('result' + e.target.result)
    console.log(e.target.files[0]);
    setUserFile(e.target.files[0].value);
    console.log(STL);
  }

  function uploadFile(e){
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', userFile)

  }

  
    return (
      <div>
        <p>Enter your .stl file here</p>
        <form onSubmit={uploadFile}>
            <input type="file" onChange={fileInputted} accept=".stl"></input>
            <br/>{STLPresent ? <label><input type="submit"></input>Submit this file</label> : <p>click the button above to select an stl file</p>}
        </form>
        <StlViewer
            modelProps={{color: "rgb(199,255,255)"}}
            style={style}
            orbitControls
            url= {url}
            //file={url}
          />
          {STL ? <>{STL}</> : <></>}
      </div>
    );
  }
  
  export default StlInsert;
  