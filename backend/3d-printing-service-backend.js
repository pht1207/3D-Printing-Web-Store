const express = require('express')
const app = express();
const multer = require('multer');
const port = 5000;
let cors = require('cors');
app.use(cors());
app.use(express.json());
const upload = multer();

app.get('/hi', (req, res) => {
  res.send('Hello World!')
  console.log('hi executed')
})

/*
app.post('/upload', (req, res) => {
    res.send('Hello World!')
    console.log('upload executed')
    console.log(req.body.file)
  })*/

app.post('/upload', upload.single('stl'), uploadFile);

function uploadFile(req, res, next) {
    console.log(req.body.file);
    res.json({ok: true}).end();
}


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})