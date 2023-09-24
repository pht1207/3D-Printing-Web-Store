import './App.css';
import React, { useState } from 'react';
import StlInsert from './components/StlInsert';
import GCodeViewerComponent from './components/GCodeViewerComponent';


function App() {  
//https://craftcloud3d.com/
//https://www.npmjs.com/package/react-gcode-viewer
const url = "https://storage.googleapis.com/ucloud-v3/6127a7f9aa32f718b8c1ab4f.gcode"

//Maybe this can be state for some sort of payment object? Like an array of the gcodes, send it to the server, pay for them all? Unsure as I don't know exactly how stripe works yet
//const [GCodes, setGCodes] = useState(false);




  return (
    <div className="App">
      <h1>Print App</h1>
      <StlInsert/>
    </div>
  );
}

export default App;
