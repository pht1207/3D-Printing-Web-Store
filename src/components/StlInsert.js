import {StlViewer} from "react-stl-viewer";
import React, { useState } from "react";

//I probably need to ditch stlviewer-react or whatever and go with three.js
//it is what github uses to display stl models on their shit and has way many more things than react-stl-viewer
//https://sbcode.net/threejs/loaders-stl/

function StlInsert() {
    //https://www.npmjs.com/package/react-stl-viewer
    const [STL, setSTL] = useState("https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl");

    const url = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"
    const style = {
      top: 0,
      left: 0,
      width: '100vw',
      height: '60vh',
  }

  function fileInputted(e){
    const file = e.target.files[0];
    if(file) {

    }
    console.log('result' + e.target.result)
    console.log(e.target.files[0]);
    setSTL(e.target.files[0].value);
    console.log(STL);
  }

  
    return (
      <div>
        <p>Enter your .stl file here</p>
        <form>
            <input type="file" onChange={fileInputted} accept=".stl"></input>
        </form>
        <StlViewer
            modelProps={{color: "rgb(199,255,255)"}}
            style={style}
            orbitControls
            url={"https://github.com/CreativeTools/3DBenchy/blob/master/Single-part/3DBenchy.stl"}
          />
          {STL ? <>{STL}</> : <></>}
      </div>
    );
  }
  
  export default StlInsert;
  