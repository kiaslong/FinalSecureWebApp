const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const xss = require('xss');
router.post('/register', userController.registerUser);

router.get('/', userController.getUserByUsername);
var options = {
    whiteList: {
    },
  };


router.get('/input', (req, res) => {
    const userInput = req.query.input; // Assume this comes from user input
       const sanitizedInput = xss(userInput,options) 
        console.log(sanitizedInput)
    // This is a sanitized HTML page served by the server
        const htmlResponse = `
        <html>
            <head>
            <title>XSS Example</title>
            </head>
            <body>
            <h1>Welcome!</h1>

            
            ${sanitizedInput}
           
            
            
            </body>
          
        </html>
        `;
    
        res.send(htmlResponse); // Sending the vulnerable HTML page to the client
    });
    

module.exports = router;
