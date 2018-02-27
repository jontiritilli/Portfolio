const express = require('express');
const path = require('path');
const cors = require('cors');
const minify = require('express-minify');
var compression = require('compression');

const PORT = process.env.port || 8300;

const app = express();

app.use(cors());
app.use(compression());
app.use(minify());
app.use(express.static(path.join(__dirname, '..', 'client')))

require('./mailer/node_mailer')(app)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'index.html'));
})

app.listen(PORT, () => {
    console.log('The system is down on ', PORT)
})