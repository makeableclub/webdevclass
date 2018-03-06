var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
    // res.send("From task routes");
    db.Task.find()
    .then(function(tasks){
      console.log(tasks);
      res.send(tasks);
    })
    .catch(function(err){
      res.send(err);
    })
});

router.post('/', function(req, res){
//    console.log(req.body);
//    res.send(req.body);

    db.Task.create(req.body)
    .then(function(newtask){
      res.status(201).json(newtask);
    })
    .catch(function(err){
      res.send(err);
    })
});

//   /api/tasks/:taskId
router.get('/:taskId', function(req, res){
    db.Task.findById(req.params.taskId)
    .then(function(task){
      res.send(task);
    })
    .catch(function(err){
      res.send(err);
    })
});

router.put('/:taskId', function(req, res){
    db.Task.findOneAndUpdate(
      {_id: req.params.taskId},
      req.body,
      {new: true})
    .then(function(task){
      res.json(task);
    })
    .catch(function(err){
      res.send(err);
    })
});

router.delete('/:taskId', function(req, res){
    db.Task.remove({_id: req.params.taskId})
    .then(function(){
      res.json({message: "Task deleted!"});
    })
    .catch(function(err){
      res.send(err);
    })
});



// Refactor function to helpers
// var helpers = require("../helpers/tasks.js")
// router.route('/')
//   .get(helpers.getTasks)
//   .post(helpers.createTask);
//


module.exports = router;
