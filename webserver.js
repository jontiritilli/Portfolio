const express = require('express');
const path = require ('path');

const app = express();

var memory = './memory_match';

app.use(express.static(path.join(__dirname, 'rootdir')));

app.get('/memory_match', function (req,res){
    res.send(memory)
})