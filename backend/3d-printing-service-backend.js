const express = require('express')
const multer  = require('multer')
const app = express()
const port = 5000;
const upload = multer({ dest: 'data/stl' })
const fs = require('fs');


let cors = require('cors');
const { parse } = require('path');
app.use(cors());
app.use(express.json());
//Used in executing commands on the server
const { exec } = require('child_process');



app.post('/upload/stl', upload.single('file'), async function (req, res, next) {
    console.log("filename: "+req.file.originalname)
    console.log(req.file.filename)
    //changes the file extension of what was uploaded to a .stl
    const currentPath = './data/stl/'+req.file.filename;
    const newPath = './data/stl/'+req.file.filename+".stl";
    fs.rename(currentPath, newPath, err =>{
      if(err){
        console.error("error converting file extension")
      }
      //else, continue program
    })

    //const url = await parseSTL(req.file);


    //Sends filename to the host after parsing it so it can be displayed in their browser
    res.send(req.file.filename);
    execTester();
    
})


function execTester(){
  const command = 'dir';
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    console.log(`Command output: ${stdout}`);
  });
}

//Sets the open directory for file downloads
const directoryPath = "./data/"
//Hosts the gcode files to the users (used in the gcodeviewer component)
//Accessed simply by doing http://localhost:5000/foldername/filename, that's it. It hosts the directory with all the .stls and .gcodes with directoryPath
app.use(express.static(directoryPath));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//Parses the stl file into a gcode file
async function parseSTL(stlFile){
  return new Promise (resolve => {

    //Need to open a cli socket. CuraEngine is stored via "C:\Program Files\UltiMaker Cura 5.4.0"
    //This command kind of got me somewhere
    //CuraEngine  slice -j "C:\Program Files\UltiMaker Cura 5.4.0\share\cura\resources\definitions\elegoo_neptune_3pro.def.json" -l "C:\Users\pht12\Downloads\dad prints\Wrench_organizer_9-19_5475962\files\Wrench-organizer_9-19.stl"
    //Doing this worked but i have no idea where it outputted to:
    //CuraEngine  slice -j "C:\Program Files\UltiMaker Cura 5.4.0\share\cura\resources\definitions\elegoo_neptune_3pro.def.json" -l "C:\Users\pht12\Downloads\dad prints\Wrench_organizer_9-19_5475962\files\Wrench-organizer_9-19.stl" -s min_wall_line_width=3 -s roofing_layer_count=2 -s roofing_monotonic=1

    //THIS WORKS!!!!!!!!!!!!!!
    //./prusa-slicer --center 112,112 --ensure-on-bed --support-material  --support-material-auto  --support-material-style organic --load ./resources/profiles/Neptune4-Config-JayoPETG-0.3Height.ini -s ./stl/*.stl --info


    //else, continue program
    })

    //Write some kind of code to turn the stl into a gcode file


    //After parsing, if it is complete, resolve the promise
    if(parsed === true){
      resolve();
    }
}