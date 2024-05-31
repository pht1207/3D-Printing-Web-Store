# README

## Notice

**This project has been superseded by [printforgers.com](https://printforgers.com), which offers a more advanced and comprehensive platform for 3D printing services.**

## Overview

This web application allows users to upload their .stl files, convert them to .gcode, and then purchase the prints. The application can be found at [https://print.parkert.dev](https://print.parkert.dev).

## User Interaction

Here is a step-by-step guide on how users interact with the site:

1. **Upload**: Users upload their .stl file.
2. **Select Quality**: Users select the quality they would like their .stl file to be parsed as. Higher quality has a higher price, and vice versa for lower quality.
3. **Parsing**: The .stl file is parsed on the server using PrusaSlicer.
4. **Receive .gcode**: A .gcode file is sent back to the user, containing the parsed .stl file.
5. **Review**: Users may check the .gcode, see the estimated price, re-parse it at a different quality, etc.
6. **Add to Cart**: Users can add the .gcode to their cart and parse more .stl files if they choose.
7. **Checkout**: Users can checkout with their cart, being brought to a dynamically created Stripe.js checkout page.
8. **Payment Handling**: Stripe.js handles all transaction information. If the transaction is approved, the server receives an order file from the Stripe.js API.
9. **Order Fulfillment**: The server operator can view the order file, print the order, and then ship it to the customer.
