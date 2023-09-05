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
    console.log(userFile);
  }

  async function uploadFile(e){
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', userFile)
    const resolve = axios.post('http://localhost:5000/upload', formData)
    console.log(resolve);
  }

  function exampleClick(){
    axios.get('http://localhost:5000/hi')
  }


  
    return (
      <div>
        <p>Enter your .stl file here</p>
        <form onSubmit={uploadFile}>
            <input type="file" onChange={fileInputted} name="input"></input>
            <br/>{STLPresent ? <label><input type="submit"></input>Submit this file</label> : <p>click the button above to select an stl file</p>}
        </form>
        <StlViewer
            modelProps={{color: "rgb(199,255,255)"}}
            style={style}
            orbitControls
            url= {url}
            //file={url}
          />
          <button onClick={exampleClick}></button>
          {userFile ? <>{userFile}</> : <></>}
      </div>
    );
  }
  
  export default StlInsert;
  