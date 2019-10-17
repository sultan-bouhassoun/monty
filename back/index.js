const customers = require('./db/customers');
const nutrition_values = require('./db/nutrition_values');
const kick_off = require('./db/kick_off');
const experimental = require('./db/experimental');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");
const server = express();

// Immediately invoked function that will copy the data in kick_off file into experimental
(function(){
 let content = fs.readFileSync("./db/kick_off.js", {encoding: 'utf8'});
 fs.writeFileSync("./db/experimental.js", content);


 /*

 */
})()

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

server.post('/api/data/all', (req, res) => {
  console.log(req)
  // NOTE ONE: the req.body will have in it two things 1-pageNumber & 2-pageSize
  // for example if the Database has 27 entries and the user is displaying 10 results per page
  // then pageSize is 10,  pageNumber is the page that he is currently at, so continuing our example
  // in the first page he will see results from 0 to 9, in 2nd page will see results from 10 till 19
  // while on 3rd (last) page he will see results from 19 till 27
  // NOTE TWO: the response should inform the user how many entries are available in the database
  // this is to help the UI put the specific number of pages that the user can traverse.
  // For example if there are 170 entries and the user is displaying 10 entries per page
  // then his buttons UI should show that he can go through pages with numbers: <| 1 2 3 ...15 16 17 |>
  let pageNumber = req.body.pageNumber;
  let pageSize = req.body.pageSize;
  ++pageNumber;
  if(pageNumber && pageSize){
    // if pageNumber and pageSize are defined then we will proceed to get the data
    
    let entries = experimental.kick_off_values;
    let entriesLength = experimental.entriesLength;
    let result = entries.filter( (entry, index) => {
       if(((pageNumber-1) * pageSize)-1 < index && index < (pageNumber) * pageSize){
         return true
       }
       return false
     }
    )
    res.send({result: result, totalRecords: experimental.entriesLength});
  } else {
    // if we didn't get pageSize and pageNumber then we will send back an error
    res.sendStatus(400)
  }

})


server.post("/api/data", (req, res) => {
  // I intentionally didn't write to the same file that I get the data from
  // don't want to wipe out the data that I retrieve in my GET request

  // Note writeFileSync doesn't have a return BUT it throws an error if the writing fails
  // so try catch block will be implemented, this is to respond to the UI whether the writing
  // to the file succeeded or not

    try {
      fs.writeFileSync("./db/nutrition_values_POST.js", JSON.stringify(req.body));
      res.sendStatus(200)
    } catch (e) {
      res.sendStatus(500)
    }

  });

const PORT = process.env.PORT || 6060;

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`))