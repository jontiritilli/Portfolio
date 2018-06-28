const express = require('express');
const path = require('path');
const cors = require('cors');
const minify = require('express-minify');
var compression = require('compression');
const bodyParser = require('body-parser');

const PORT = process.env.port ||6700;

const app = express();

app.use(compression());
app.use(minify());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname, '..', 'client')))

app.use(express.static(path.join(__dirname, '..','client','assets','images','backgrounds')))

require('./mailer/node_mailer')(app)

app.get('/ogimage', (req,res)=>{
  res.send('linkImage.png');
})

app.listen(PORT, () => {
    console.log('The system is down on ', PORT)
})
