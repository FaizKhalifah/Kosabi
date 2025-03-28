const bodyParser = require("body-parser");
const path = require("path");
var express = require("express");
var port = process.env.PORT || 8080;

var app = express();
app.use(bodyParser.json());

// set up view
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res)=>{
    res.render('main');
})
app.listen(3000,console.log("server start on port 3000"));