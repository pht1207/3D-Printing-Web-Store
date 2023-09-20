import './App.css';
import React, { useState } from 'react';
import StlInsert from './components/StlInsert';
import {GCodeViewer} from "react-gcode-viewer";


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const [visiblePercentage, setVisiblePercentage] = useState(1)
  
//https://craftcloud3d.com/
//https://www.npmjs.com/package/react-gcode-viewer
const url = "https://storage.googleapis.com/ucloud-v3/6127a7f9aa32f718b8c1ab4f.gcode"


function GCodeLoadedFunction(){
  setIsLoaded(true);
  console.log('hamood');
}

const handleSliderChange = (event) => {
  const newValue = parseInt(event.target.value, 10);
  setSliderValue(newValue);
  setVisiblePercentage(newValue/100)
  console.log(sliderValue)
};

const slider = (
  <input
  type="range"
  min={0}
  max={100}
  value={sliderValue}
  onChange={handleSliderChange}
/>
)




  return (
    <div className="App">
      <h1>Print App</h1>
      <StlInsert/>
        <div className='GCodeViewerDiv'>
          {isLoaded? slider : <p>asdjaslhdlajks</p>}
          <GCodeViewer
                orbitControls={true}
                showAxes={true}
                url={url}
                style={{width:"100%", height:"100%"}}
                floorProps={{gridLength:235, gridWidth:235}}
                visible={visiblePercentage}
                onFinishLoading={GCodeLoadedFunction}
            />

      </div>
    </div>
  );
}

export default App;
