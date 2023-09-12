const express = require('express')
const multer  = require('multer')
const app = express()
const port = 5000;
const upload = multer({ dest: 'uploads/' })

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

app.post('/uploadarray', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})