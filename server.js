// Setup empty JS object to act as endpoint for all routes
let gateways = []

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('gateways'));

// Setup Server
const port = process.env.PORT || 3000;

const listening = () => {
    console.log('Hey, server running...');
};

// start the server
app.listen(port, listening);

// module name
const moduleName = 'Gateway';

app.get('/', (req, res) => res.send('Gateways is ready.'));

// Get All Gateways API
app.get(`/${moduleName}/GetAll`, (request, response) => {
    response.send({
        status: 200,
        body: gateways
    });
});

// add Gateway API
app.post(`/${moduleName}/Add`, (request, response) => {
    request.body.id = Date.now().toString();
    gateways.push(request.body);
    console.log(gateways);
    response.send({ status: 200 });
});

// add Gateway API
app.post(`/${moduleName}/Update/:id`, (request, response) => {
    const gatewayIndex = gateways.indexOf(gateways.find(gateway => gateway.id === request.params.id));
    gateways[gatewayIndex] = request.body;
    response.send({ status: 200 });
});

// Get Specific Gateway API
app.get(`/${moduleName}/Get/:id`, (request, response) => {
    if (gateways.find(gateway => gateway.id === request.params.id)) {
        response.send({
            status: 200,
            body: gateways.find(gateway => gateway.id === request.params.id)
        });
    } else {
        response.status(500).send({ status: 500, message: "There's no gateway with this Id" });
    }
});

// 404 API handling
app.use((req, res, next) => {
    res.status(404).send({ status: 404, message: 'Not Found' });
});