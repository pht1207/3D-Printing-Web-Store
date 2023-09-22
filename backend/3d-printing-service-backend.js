const express = require('express')
const multer  = require('multer')
const app = express()
const port = 5000;
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');


let cors = require('cors');
const { parse } = require('path');
app.use(cors());
app.use(express.json());

const directoryPath = "./gcodes/"


app.post('/upload', upload.single('file'), async function (req, res, next) {
    console.log("filename: "+req.file.originalname)
    console.log(req.file.filename)
    //changes the file extension of what was uploaded to a .stl
    const currentPath = './uploads/'+req.file.filename;
    const newPath = './uploads/'+req.file.filename+".stl";
    fs.rename(currentPath, newPath, err =>{
      if(err){
        console.error("error converting file extension")
      }
      //else, continue program
    })

    //const url = await parseSTL(req.file);


    //Sends filename to the host after parsing it so it can be displayed in their browser
    res.send(req.file.filename);
    
})

//Hosts the gcode files to the users (used in the gcodeviewer component)
//Accessed simply by doing http://localhost:5000/filename, that's it. It hosts the directory with all the gcodes with directoryPath
app.use(express.static(directoryPath));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//Parses the stl file into a gcode file
async function parseSTL(stlFile){
  return new Promise (resolve => {

      //else, continue program
    })

    //Write some kind of code to turn the stl into a gcode file


    //After parsing, if it is complete, resolve the promise
    if(parsed === true){
      resolve();
    }
}