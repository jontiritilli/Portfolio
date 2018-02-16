const express = require('express');
const path = require('path');

const PORT = process.env.port || 9000;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')))

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
})

app.get('/memory_match', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'memory_match', 'index.html'));
})

app.get('/calculator', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'client', 'calculator', 'index.html'));
})

app.listen(PORT, function(){
    console.log('The system is down on ', PORT)
})