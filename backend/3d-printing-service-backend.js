const express = require('express')
const multer  = require('multer')
const app = express()
const port = 5000;
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');


let cors = require('cors');
app.use(cors());
app.use(express.json());

app.get('/hi', (req, res) => {
  res.send('Hello World!')
  console.log('hi executed')
})


app.post('/upload', upload.single('file'), function (req, res, next) {
    console.log("filename: "+req.file.originalname)

  // req.file is the `file` file
  // req.body will hold the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})