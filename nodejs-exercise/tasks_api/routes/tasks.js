var express = require('express');

// var router = express.Router();
// need to specify "mergeParams"
var router = express.Router({ mergeParams: true });

var handler = require("../handlers/tasks.js")


// use prefix:  /api/users/:id/tasks


// /api/tasks
router.route('/')
    .get(handler.getTasks)
    .post(handler.createTask);

/*
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
    db.Task.create(req.body)
    .then(function(newtask){
      res.status(201).json(newtask);
    })
    .catch(function(err){
      res.send(err);
    })
});
*/



//   /api/tasks/:taskId
router.route('/:taskId')
    .get(handler.getTask)
    .put(handler.updateTask)
    .delete(handler.deleteTask);

/*
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
*/

// Refactor function to handlers
// var handler = require("../handlers/tasks.js")
// router.route('/')
//   .get(handler.getTasks)
//   .post(handler.createTask);
//

module.exports = router;
