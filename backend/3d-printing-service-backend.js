const express = require('express')
const multer  = require('multer')
const app = express()
const port = 5005;
const upload = multer({ dest: 'data/stl' })
const fs = require('fs');


let cors = require('cors');
const { parse } = require('path');
app.use(cors());
app.use(express.json());
//Used in executing commands on the server
const { exec } = require('child_process');


const folders = [];

//Constructor for creating user objects for the users[] array.
function Folder(id, file, progress, index, paid){
  this.id = id;
  this.file = file;
  this.progress = progress;
  this.index = index;
  this.paid = paid;
}


app.post('/upload/stl', upload.single('file'), async function (req, res, next) {
    console.log("app.post called!")
    console.log("filename: "+req.file.originalname)
    console.log(req.file.filename)
    
    //Creates a user object when stls are sent
    let id = req.file.filename
    let fileName = req.file.originalname;
    let gcodeProgress = 0;
    let foldersIndex = folders.length;
    let paid = false;
    const newFolder = new Folder(id, fileName, gcodeProgress, foldersIndex, paid)
    folders.push(newFolder)


    fs.mkdir('./data/'+newFolder.id, (err) => {
      if(err) {
        console.error("Error creating folder: ${err}");
      }
      else{
        console.log("Folder '${foldername}', made")
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


    //Sends filename to the host after parsing it so it can be displayed in their browser
    res.send(id);
    parseSTL(id);
    
})


app.post('/gcode', async function(req, res){

  let id = req.body.id;
  let gcodeOptions;
  parseSTL(id);

})



//Sets the open directory for file downloads
const directoryPath = "./data/"
//Hosts the gcode files to the users (used in the gcodeviewer component)
//Accessed simply by doing http://localhost:5000/foldername/filename, that's it. It hosts the directory with all the .stls and .gcodes with directoryPath
app.use(express.static(directoryPath));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//Parses the stl file into a gcode file
async function parseSTL(multerID){
  let id = multerID
  console.log("parseSTL running...")
  return new Promise (resolve => {
    let supportType;
    let materialType;
    //if(materialType === 'PETG'){--load ./resources/profiles/Neptune4-Config-JayoPETG-0.3Height.ini}
    const commandReal = './prusaslicer/prusa-slicer --center 112,112 --ensure-on-bed --support-material  --support-material-auto  --support-material-style organic --load ./prusaslicer/resources/profiles/Neptune4-Config-JayoPETG-0.3Height.ini -s ./data/'+id+'/'+id+'.stl --info --output ./data/'+id;

    exec(commandReal, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }
      console.log(`Command output: ${stdout}`);
    });

    resolve(1)

    //else, continue program
    })

    //Write some kind of code to turn the stl into a gcode file


    //After parsing, if it is complete, resolve the promise
    if(parsed === true){
      resolve();
    }
}