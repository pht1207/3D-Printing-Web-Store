import React, { useRef } from 'react';
import { Canvas } from 'react-three-fiber';
import { STLLoader } from 'three-stl-loader';
import { OrbitControls } from 'drei'; // Import OrbitControls

const NewViewer = () => {
    const stlRef = useRef();

    const onLoad = (geometry) => {
      stlRef.current.geometry = geometry;
    };
  
    return (
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.8} />
        <mesh ref={stlRef}>
          <STLLoader
            url="/path/to/your-model.stl" // Replace with your STL file path
            onLoad={onLoad}
          />
        </mesh>
        <OrbitControls /> {/* Add OrbitControls for camera control */}
      </Canvas>
    );
  };

export default NewViewer;