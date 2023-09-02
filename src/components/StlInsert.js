import {StlViewer} from "react-stl-viewer";
import React, { useState } from "react";

function StlInsert() {
    const [STL, setSTL] = useState("https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl");

    const url = "https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"
    const style = {
      top: 0,
      left: 0,
      width: '100vw',
      height: '80vh',
      color: "red"
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
      <div className="App">
        <form>
            <input type="file" onChange={fileInputted} accept=".stl"></input>
        </form>
        <StlViewer
              style={style}
              orbitControls
              url={"https://storage.googleapis.com/ucloud-v3/ccab50f18fb14c91ccca300a.stl"}
          />
          {STL ? <>{STL}</> : <></>}
      </div>
    );
  }
  
  export default StlInsert;
  