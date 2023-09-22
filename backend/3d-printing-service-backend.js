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



app.post('/upload', upload.single('file'), async function (req, res, next) {
    console.log("filename: "+req.file.originalname)
    console.log(req.file.filename)
    res.download("./uploads/"+req.file.filename);
//    const url = await parseSTL(req.file);
    
  //  res.send(url);
  // req.file is the `file` file
  // req.body will hold the text fields, if there were any
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



//Parses the stl file into a gcode file
async function parseSTL(stlFile){
  return new Promise (resolve => {
    let name = stlFile.filename

    //Write some kind of code to turn the stl into a gcode file

    if(parsed === true){
      resolve("uploads/"+name)
    }
    }
  )
}