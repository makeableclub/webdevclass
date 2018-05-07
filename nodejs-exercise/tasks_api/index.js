require("dotenv").config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const { requireLogin, requireCorrectUser } = require('./middleware/auth');
const port = process.env.PORT || 3001;

// const cors = require("cors");
// app.use(cors());
const errorHandler = require("./handlers/error");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));


const taskRoutes = require('./routes/tasks');
// old prefix
app.use('/api/tasks', taskRoutes);
// use new prefix:  /api/users/:id/tasks
app.use('/api/users/:id/tasks', requireLogin, requireCorrectUser, taskRoutes);
// app.use('/api/users/:id/tasks', taskRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


// add this as the last "app.use()" call, to format error in JSON format
app.use(errorHandler);

// process.env.PORT,
app.listen( port, function(){
    console.log("App is runnig at " + port);
});



///
/// Zen program
///
var sentences = [
  "makeable club",
  "use common sense",
  "practice makes perfection",
  "do your job, so I can do my job"
];

app.get('/zen', function(req, res) {
    var random = Math.random(0, 1);
    var idx = Math.floor( random * sentences.length);
    console.log(idx);

    var sentence = sentences[idx];
    res.send(sentence);
});

app.get('/', function(req, res){
    res.send("Hello world, from Node.js app.");
    // res.sendFile("index.html");
});
