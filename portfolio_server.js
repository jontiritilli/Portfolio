const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname,'rootdir')))
app.get('/memory_match', function(req,res){
    
});

app.listen(3000, function(){
    console.log('The system is down')
})