import './App.css';
import React, { useState } from 'react';
import StlInsert from './components/StlInsert';
import GCodeViewerComponent from './components/GCodeViewerComponent';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const [visiblePercentage, setVisiblePercentage] = useState(1)
  
//https://craftcloud3d.com/
//https://www.npmjs.com/package/react-gcode-viewer
const url = "https://storage.googleapis.com/ucloud-v3/6127a7f9aa32f718b8c1ab4f.gcode"



  return (
    <div className="App">
      <h1>Print App</h1>
      <StlInsert/>
      <GCodeViewerComponent/>
    </div>
  );
}

export default App;
