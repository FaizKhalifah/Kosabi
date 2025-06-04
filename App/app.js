const bodyParser = require("body-parser");
const path = require("path");
var express = require("express");
var port = process.env.PORT || 8080;
const mainRouter = require("./routes/indexRoutes");
const engine = require("ejs-mate");
const session = require("express-session")

var app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'rahasia-anda',
  resave: false,
  saveUninitialized: false,
}));


// set up view
app.set('view engine', 'ejs');
app.engine("ejs", engine);
app.use(express.static(path.join(__dirname, 'public')));
app.use(mainRouter);

app.get('/',(req,res)=>{
    res.render('main');
})
app.listen(3000,()=>{
    console.log(__dirname);
    console.log("server started at port 3000")
});