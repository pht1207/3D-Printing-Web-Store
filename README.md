This is a web application that allows users to upload their .stl files, convert them to .gcode and then purchase them.
The application can be found on https://print.parkert.dev.

Step by step, this is how users interact with the site.
1. Users upload their .stl file.
2. Users select the quality they would like their .stl file to be parsed as. Higher quality has a higher price and vice versa for lower quality.
3. The .stl file is parsed at the server using PrusaSlicer.
4. A .gcode file is sent back to the user, containing the parsed .stl file
5. The user may check the .gcode, see the estimated price, re-parse it at a different quality, etc.
6. The user may add the .gcode to their cart and parse more .stl files if they choose.
7. The user can checkout with their cart, being brought to a dynamically created Stripe.JS checkout page.
8. Stripe.JS will handle all transaction information, if the transaction is approved, the server will be sent a file containing the order information from the Stripe.JS api.
9. The server operator will be able to view this order file, print, and then ship their order to the customer.
