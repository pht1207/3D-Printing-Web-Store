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


//Stripe test key
const stripe = require("stripe")('sk_test_51NpxjLJfFzW7oP7EXHvOrSGY9PBG6K7zlgWTc0msnf0ycJFBWJalNqmfBwgsSscRvsggUkx1ZwcaUJAOIlQUd8E900cCiribBn');






const folders = [];
//Constructor for creating user objects for the users[] array.
function Folder(id, file, isParsed, index, paid, cost, paymentLink){
  this.id = id;
  this.file = file;
  this.isParsed = isParsed;
  this.index = index;
  this.paid = paid;
  this.cost = cost;
  this.paymentLink = paymentLink
}


//Used in accepting the stl file and storing it for the client
app.post('/upload/stl', upload.single('file'), async function (req, res, next) {
    console.log("filename: "+req.file.originalname)
  
    //Creates a user object when stls are sent
    let id = req.file.filename
    let fileName = req.file.originalname;
    let isParsed = false;
    let foldersIndex = folders.length;
    let paid = false;
    let cost = 1;
    let paymentLink = '';
    const newFolder = new Folder(id, fileName, isParsed, foldersIndex, paid, cost, paymentLink)
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
    //Sends filename to the host after downloading it so it can be displayed in their browser
    res.send(id);
    
})


//Used for parsing the stl file into gcode and determining price from said gcode
app.post('/gcode', async function(req, res){
  let id = req.body;
  let folderIndex = findFile(id);
  //let gcodeOptions;
  await parseSTL(id);

  await findFilamentUsed(id)
  console.log("Cost is: "+folders[folderIndex].cost+"$");

  console.log("sending res...")
  
  //Makes a Stripe custom payment amount
  const price = await stripe.prices.create({
    product: "prod_OiRHeee3sS2bJu", // Replace with your actual product ID
    unit_amount: (folders[folderIndex].cost)*100,
    currency: 'usd',
  });
  console.log(price);

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [
      {
        price: price.id,
        quantity: 1,
      },
    ],
    automatic_tax: {
      enabled: true,
    },
  });
  console.log(paymentLink)
  folders[folderIndex].paymentLink = paymentLink;

  res.send(folders[folderIndex])
})





app.post("/create-payment-intent", async (req, res) => {

});








//Finds the folder index in the folders array
function findFile(id){
  for(let i = 0; i <= folders.length; i++){
    if(folders[i].id === id){
      return i;
    }
  }
  return -1; //if not found
}



//Finds filament used and sets it to a value of x5 what is found, plus one dollar. Only slightly arbitrary number ;).
async function findFilamentUsed(id){
  const filePath = './data/'+id+'/'+id+'.gcode'; // Replace with your file path
  const searchString = 'total filament cost'; // Replace with the keyword or pattern you want to search for

  const folderIndex = findFile(id);
  return new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    // Split the file content into lines
    const lines = data.split('\n');
  
    // Iterate through each line to find the line containing the keyword
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(searchString)) {
        // You can extract information from this line as needed
        const regex = /[\d.]+/g;
        let regtest = lines[i].match(regex);
        const cost = parseFloat(regtest[0])
        //Sets the cost
        folders[folderIndex].cost = (cost*5)+1;
        console.log(folders[folderIndex].cost)
        resolve();//breaks if found
      }
    }
  });
})
}



//Sets the open directory for file downloads
const directoryPath = "./data/"
app.use(express.static(directoryPath));


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


const { spawn } = require('child_process');
//Parses the stl file into a gcode file
async function parseSTL(fileID){
  let folderIndex = findFile(fileID);

  return new Promise((resolve, reject) => {
  let id = fileID;
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
    if(stdoutData.includes("exceeds the maximum build volume height.")){
      folders[folderIndex].isParsed = "This model is too large to print"
    }
      resolve("Bad")
      console.error(`stderr: ${data}`);
    });
    
    childProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      console.log(stdoutData);
      folders[folderIndex].isParsed = "Successful";
      resolve(stdoutData);
    });
})
}