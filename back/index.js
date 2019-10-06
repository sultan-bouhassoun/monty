const express = require('express');

const server = express();

// data will be stored in JSON format files
server.get('/api/data', (req, res) => {
    res.send('Success!');
})

const PORT = process.env.PORT || 6060;

server.listen(PORT, () => console.log(`Server running on port ${PORT}...`))