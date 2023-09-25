const express = require('express')
const multer  = require('multer')
const app = express()
const port = 5005;
const upload = multer({ dest: 'data/stl' })
const fs = require('fs');

//Used to parse the body of post requests
const bodyParser = require('body-parser');
app.use(bodyParser.text());



let cors = require('cors');
const { parse } = require('path');
app.use(cors());
app.use(express.json());
//Used in executing commands on the server


const folders = [];

//Constructor for creating user objects for the users[] array.
function Folder(id, file, isParsed, index, paid){
  this.id = id;
  this.file = file;
  this.isParsed = isParsed;
  this.index = index;
  this.paid = paid;
}


app.post('/upload/stl', upload.single('file'), async function (req, res, next) {
    console.log("filename: "+req.file.originalname)
  
    //Creates a user object when stls are sent
    let id = req.file.filename
    let fileName = req.file.originalname;
    let isParsed = false;
    let foldersIndex = folders.length;
    let paid = false;
    const newFolder = new Folder(id, fileName, isParsed, foldersIndex, paid)
    folders.push(newFolder) //Adds this new object to the stack


    fs.mkdir('./data/'+newFolder.id, (err) => {
      if(err) {
        console.error("Error creating folder: ${err}");
      }
    })

    //changes the file extension of what was uploaded to a .stl
    const currentPath = './data/stl/'+id;
    const newPath = './data/'+newFolder.id+"/"+id+".stl";    
    fs.rename(currentPath, newPath, err =>{
      if(err){
        console.error("error converting file extension")
      }
      //else, continue program
    })

    //const url = await parseSTL(req.file);


    //Sends filename to the host after downloading it so it can be displayed in their browser
    res.send(id);
    
})


app.post('/gcode', async function(req, res){
  console.log("post /gcode called! \n")
  let id = req.body;
  //let gcodeOptions;
  await parseSTL(id);
  console.log("sending res...")
  res.send("Finished")

})



//Sets the open directory for file downloads
const directoryPath = "./data/"
//Hosts the gcode files to the users (used in the gcodeviewer component)
//Accessed simply by doing http://localhost:5000/foldername/filename, that's it. It hosts the directory with all the .stls and .gcodes with directoryPath
app.use(express.static(directoryPath));


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


//const { exec } = require('child_process');
const { spawn } = require('child_process');

//Parses the stl file into a gcode file
async function parseSTL(multerID){
  return new Promise((resolve, reject) => {
  let id = multerID
  console.log("parseSTL running...")
    let supportType;
    let materialType;
    //if(materialType === 'PETG'){--load ./resources/profiles/Neptune4-Config-JayoPETG-0.3Height.ini}
    const command = './prusaslicer/prusa-slicer --center 112,112 --ensure-on-bed --support-material  --support-material-auto  --support-material-style organic --load ./prusaslicer/resources/profiles/Neptune4-Config-JayoPETG-0.3Height.ini -s ./data/'+id+'/'+id+'.stl --info --output ./data/'+id;

    const childProcess = spawn(command, {shell: true})
    let stdoutData = ''; // Variable to accumulate stdout data

    childProcess.stdout.on('data', (data) => {
      const chunk = data.toString();
      stdoutData += chunk;
      console.log(`stdout: ${data}`);
    });
    
    childProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    childProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      console.log(stdoutData);
      resolve(stdoutData)
    });
/*
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }
      console.log(`Command output: ${stdout}`);
      if(stdout.includes("Slicing results exported to: ")){
      console.log("SUCCESS!");
      resolve(1)
      }
    });
    console.log("parsestl reached end!")
    })
  */})
}