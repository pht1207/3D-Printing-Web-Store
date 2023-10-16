import {GCodeViewer} from "react-gcode-viewer";
import React, { useState } from 'react';

function GCodeViewerComponent(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [sliderValue, setSliderValue] = useState(100);
  const [visiblePercentage, setVisiblePercentage] = useState(1);

  //https://craftcloud3d.com/
  //https://www.npmjs.com/package/react-gcode-viewer

  const url = "https://print.parkert.dev/backend/"+props.id+"/"+props.id+".gcode"

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
  <>
    <p>Check your model</p>
    <p>Slider: {sliderValue}%</p>
    <input
    type="range"
    min={0}
    max={100}
    value={sliderValue}
    onChange={handleSliderChange}
  />
  </>
  )
    
    
      return (
        <div className='GCodeViewerDiv'>
          {isLoaded? slider : <></>}
          <GCodeViewer
                orbitControls={true}
                showAxes={true}
                url={url}
                layerColor= {"rgb(0, 128, 255)"}
                style={{width:"100%", height:"100%"}}
                floorProps={{gridLength:235, gridWidth:235}}
                visible={visiblePercentage}
                onFinishLoading={GCodeLoadedFunction}
            />

      </div>
      );
    }
    
    export default GCodeViewerComponent;
    