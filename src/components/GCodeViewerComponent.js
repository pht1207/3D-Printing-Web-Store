import {GCodeViewer} from "react-gcode-viewer";
function GCodeViewerComponent() {
    //https://craftcloud3d.com/
    //https://www.npmjs.com/package/react-gcode-viewer

    const url = "https://storage.googleapis.com/ucloud-v3/6127a7f9aa32f718b8c1ab4f.gcode"
    const style = {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
    }
    
    
      return (
        <div className="App" style={{backgroundColor:"grey", width:"100vw", height:"100vh"}}>
          <h1>Print App</h1>
          <StlInsert/>
          <GCodeViewer
                orbitControls
                showAxes
                style={style}
                url={url}
            />
        </div>
      );
    }
    
    export default GCodeViewerComponent;
    