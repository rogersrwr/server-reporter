const fs = require('fs');
//const https = require('https');
const express = require('express');
const path = require('path');
const { App } = require('@slack/bolt');

const app1 = new App({ 
    token: '',
    signingSecret: '',
  });
  
//const channelId = 'C06KJ8ML7PA';    //personal
const channelId = 'C06LGR0MJRW';   


const app = express();
const PORT = 3000;

const dataFilePath = './counters.json';

//load counters from file
let counters = {};
if (fs.existsSync(dataFilePath)) {
    counters = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
    console.log(counters.counter1);
} else {
    counters = { counter1: 0, counter2: 0 };
}

// Middleware to parse JSON bodies
app.use(express.json());



//Route to get current counters
app.get('/counters', (req, res) => {
    res.json(counters);
});


//Serve static files from the 'public' directory
app.use(express.static('public'));


//Store data received from POST requests
let postData = {};

// Route to handle POST requests
app.post('/your-endpoint', (req, res) => {
    const data = req.body;
    //const { counter } = req.body;

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

    if (data.action == 'addBV') {
        console.log(' ');
        console.log(`Previous counter1 value: ${counters.counter1}`);
        counters.counter1++;
        fs.writeFileSync(dataFilePath, JSON.stringify(counters, null, 2)); // Save to file
        //res.json({ success: true, value: counters.counter1 });
        console.log(`New counter1 value: ${counters.counter1}`);
    }

    if (data.action == 'addPH') {
        console.log(' ');
        console.log(`Previous counter2 value: ${counters.counter2}`);
        counters.counter2++;
        fs.writeFileSync(dataFilePath, JSON.stringify(counters, null, 2));
        console.log(`New counter2 value: ${counters.counter2}`);
    }

    if (data.action == 'addVoice') {
        console.log(' ');
        console.log(`Previous counter3 value: ${counters.counter3}`);
        counters.counter3++;
        fs.writeFileSync(dataFilePath, JSON.stringify(counters, null, 2));
        console.log(`New counter3 value: ${counters.counter3}`);
    }

    if (data.action == 'addServer') {
        console.log(' ');
        console.log(`Previous counter4 value: ${counters.counter4}`);
        counters.counter4++;
        fs.writeFileSync(dataFilePath, JSON.stringify(counters, null, 2));
        console.log(`New counter4 value: ${counters.counter4}`);
    }

    if (data.action == 'reset') {
        console.log(' ');
        console.log('Resetting all counters');
        counters.counter1 = 0;
        counters.counter2 = 0;
        counters.counter3 = 0;
        counters.counter4 = 0;
        fs.writeFileSync(dataFilePath, JSON.stringify(counters, null, 2));
        console.log(`New counter values: ${counters.counter1}, ${counters.counter2}, ${counters.counter3}, ${counters.counter4}`);
    }

    if (data.action == 'report') {

    }



    // Send a response back to the client
    res.status(200).send('Data processed successfully');
});



app.post('/view', async (req, res) => {
    const data = req.body;

    if (data.action == 'show') {
        await app1.client.chat.postMessage({
            token: process.env.O_AUTH,
            channel: channelId,
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Automations Status Report:*  \n"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `BrightView Regression Test: ${counters.counter1}/2 successful runs past 24 hours`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `ParentHub Regression Tests: ${counters.counter2}/2 successful runs past 24 hours.`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Voice message checker: ${counters.counter3}/46 successful runs past 24 hours`
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `Server status checker: ${280 - counters.counter4} missed checks`
                    }
                }
            ]
            
        });
        res.status(200).send('Data processed successfully');
    }
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
