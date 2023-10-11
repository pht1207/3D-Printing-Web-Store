
//Everything below this comment is webhooks for data from Stripe regarding payments and charges
// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_b29e9d1ebc7acd11d829f7f2dac404dd60dc62c3bd16b9a5b2b48f1508cdecef";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;
      invoicePaymentSucceededFunction(invoicePaymentSucceeded);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  
  function invoicePaymentSucceededFunction(invoiceObject){
    const metaData = invoiceObject.data.object.metadata;
    const paymentIntentID = invoiceObject.data.object.payment_intent;
    const orderIDs = metaData.split(" "); //Splits the metadata into many strings depending on space between them

    //Make new directory with the paymentIntendID inside of './completedOrders'
    fs.mkdir('./completedOrders/' + paymentIntentID, (err) => {
      if (err) {
        console.error("Error creating folder: ${err}");
      }
      else{
        //Go through all the orders and put them into the completedOrders folder
        for(let i = 0; i < orderIDs.length; i++){
          const currentItemID = orderIDs[i]
          
            const currentSTLPath = './data/'+currentItemID+'/'+currentItemID+".stl";
            const newSTLPath = './data/completedOrders'+paymentIntentID+'/'+currentItemID+".stl";     
            //Moves the .stl and .gcode to the new folder

            fs.rename(currentSTLPath, newSTLPath, err =>{
              if(err){
                console.error("error moving .stl file")
              }
              else{
                const currentGCodePath = './data/'+currentItemID+'/'+currentItemID+".gcode";
                const newGCodePath = './data/completedOrders'+paymentIntentID+'/'+currentItemID+".gcode";     
    
                fs.rename(currentGCodePath, newGCodePath, err =>{
                  if(err){
                    console.error("error moving .gcode file")
                  }
                  else{
                    console.log(".stl and .gcode moved to completedOrders folder.")
                  }
                })
              }
            })
        }
        //Once loop is complete, create a text document that has some order info on it. Complete this once I know the above code actually works
        //fs.mkfile
      }
    })
  }


         
              




  // Return a 200 response to acknowledge receipt of the event
  response.send();
});