var express = require('express');
var app = express();
var port = process.env.PORT || 3001;

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.send("Hello world, from Node.js app.");
    // res.sendFile("index.html");
});

/// Zen program
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


var taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

// process.env.PORT,
app.listen( port, function(){
    console.log("App is runnig at 3001");
});
