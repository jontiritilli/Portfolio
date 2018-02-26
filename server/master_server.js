const express = require('express');
const path = require('path');

const PORT = process.env.port || 8500;

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')))

app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client', 'index.html'));
})

app.get('/memory_match', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client', 'memory_match', 'index.html'));
})

app.get('/calculator', (req, res) => {
    res.sendFile(resolve(__dirname, '..', 'client', 'calculator', 'index.html'));
})

app.listen(PORT, () => {
    console.log('The system is down on ', PORT)
})
