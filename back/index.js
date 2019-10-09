const customers = require('./db/customers');
const nutrition_values = require('./db/nutrition_values');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");
const server = express();

//https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
// more details about cors issue

// cors middleware used
server.use(cors())
// body parser middleware for easier handleing of POST requests 
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// data will be stored in JSON format files
server.get('/api/data', (req, res) => {
    res.send(nutrition_values);
})

server.post("/api/data", (req, res) => {
  // I intentionally didn't write to the same file that I get the data from
  // don't want to wipe out the data that I retrieve in my GET request
    fs.writeFileSync("./db/nutrition_values_POST.js", JSON.stringify(req.body));
  });

const PORT = process.env.PORT || 6060;

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`))