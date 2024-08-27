const fs = require('fs');
//const https = require('https');
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

//Serve static files from the 'public' directory
app.use(express.static('public'));


//Store data received from POST requests
let postData = {};

// Route to handle POST requests
app.post('/your-endpoint', (req, res) => {
    const data = req.body;

    // Process the received data
    console.log('Data received:', data);

    // Execute your code here based on the received data
    // For example:
    if (data.action === 'start') {
        console.log('Starting process...');
        // Code to start a process
    } else if (data.action === 'stop') {
        console.log('Stopping process...');
        // Code to stop a process
    }

    // Send a response back to the client
    res.status(200).send('Data processed successfully');
});

// Load your SSL certificates (replace with your actual certificate and key paths)
// const options = {
//     key: fs.readFileSync('./private-key.pem'),
//     cert: fs.readFileSync('./certificate.pem')
// };


//Route to serve the HTML page dynamically
app.get('/', (req, res) => {
    res.render('index', { data: postData });
});



// Create HTTPS server
// https.createServer(app).listen(PORT, () => {
//     console.log(`HTTPS Server running on port ${PORT}`);
// });

//Create HTTP server
app.listen(PORT, () => {
    console.log(`HTTP server running on port ${PORT}`);
});
