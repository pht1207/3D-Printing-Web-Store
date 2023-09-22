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

    //const url = await parseSTL(req.file);


    //Sends filename to the host after parsing it so it can be displayed in their browser
    res.send(req.file.filename);
    
})

//Hosts the gcode files to the users (used in the gcodeviewer component)
app.use(express.static(directoryPath));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//Parses the stl file into a gcode file
async function parseSTL(stlFile){
  return new Promise (resolve => {

    //Write some kind of code to turn the stl into a gcode file

    if(parsed === true){
      resolve();
    }
    }
  )
}