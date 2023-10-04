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
app.post('/upload/stl', upload.single('file'), async function (req, res) {
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


    fs.mkdir('./data/' + newFolder.id, (err) => {
    if (err) {
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
  //let gcodeOptions; //sent to the parsestl function
  await parseSTL(id);

  await findFilamentUsed(id)

  res.send(folders[folderIndex])
})


//Parses the stl into gcode from form given by the user
app.post('/gcodeWithOptions', async function(req, res){
  console.log(req.body.serverFileID);
  console.log(req.body.selectedQuality);
  
  let id = req.body;
  let folderIndex = findFile(id);
  //let gcodeOptions; //sent to the parsestl function
  await parseSTL(id);

  await findFilamentUsed(id)

  res.send(folders[folderIndex])
})












//Calculate shipping costs?
//https://www.easypost.com/usps-node-api
//https://stripe.com/docs/api/shipping_rates/object



//Have some sort of function to track backorder time




//Finds the folder index in the folders array
function findFile(id){
  for(let i = 0; i <= folders.length; i++){
    if(folders[i].id === id){
      return i;
    }
  }
  return -1; //if not found
}


//Make some sort of way to put the payments in an array, put line_items equal to the array and bam, cart
app.post('/paymentLinkCreator', async function(req, res){
  let cart = req.body;
  let metadataID = '';
  console.log(cart)
  //Gets all items from the cart id array and matches them to the items on the server file system
  //Pushes all of them into an items array
  let items = [];
  for(let i = 0; i < cart.length; i++){
    for(let j = 0; j < folders.length; j++){
      if(cart[i] === folders[j].id)
      {
        items.push(folders[j])
        metadataID += folders[j].id;
      }
    }
  }
  console.log("items in item array: " + items.length);
  

  //Makes a Stripe custom payment amount for each cart item
  let paymentLinkItems = [];
  for(let i = 0; i < items.length; i++){
  const price = await stripe.prices.create({
    product: "prod_OiRHeee3sS2bJu", // Replace with your actual product ID
    unit_amount: (items[i].cost)*100,
    currency: 'usd',
  });
  paymentLinkItems.push({price: price, quantity: 1, adjustable_quantity: {enabled: true, minimum: 1, maximum: 10}})
  }
  //Maps the array so i can be used inside of stripe.paymentLinks.create
  const lineItems = paymentLinkItems.map(item => ({
    price: item.price.id,
    quantity: item.quantity,
    adjustable_quantity: item.adjustable_quantity,
  }));
  console.log(lineItems)
  
  //https://stripe.com/docs/payment-links/api#address-collection
  const paymentLink = await stripe.paymentLinks.create({
    line_items: lineItems,
    automatic_tax: {
      enabled: true,
    },
    billing_address_collection: 'required',
    shipping_address_collection: {
      allowed_countries: ['US'],
    },
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: 'Invoice for 3D Print Purchase',
        metadata: {
          OrderID: metadataID
        }
      }
    },
  });
  
  console.log(paymentLink.url)

  res.send(paymentLink.url)
})






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