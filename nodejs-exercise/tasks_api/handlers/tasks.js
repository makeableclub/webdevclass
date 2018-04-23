var db = require('../models');

// Refactor ./routes/tasks.js
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
*/

exports.getTasks = function(req, res) {
  db.Task.find()
  .then(function(tasks){
    console.log(tasks);
    res.send(tasks);
  })
  .catch(function(err){
    res.send(err);
  })
}

/*
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

exports.createTask = function(req, res) {
  db.Task.create(req.body)
  .then(function(newtask){
    res.status(201).json(newtask);
  })
  .catch(function(err){
    res.send(err);
  })
}


//   /api/tasks/:taskId
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
*/
exports.getTask = function(req, res){
    db.Task.findById(req.params.taskId)
    .then(function(task){
      res.send(task);
    })
    .catch(function(err){
      res.send(err);
    })
};

exports.updateTask = function(req, res){
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
};

exports.deleteTask = function(req, res){
    db.Task.remove({_id: req.params.taskId})
    .then(function(){
      res.json({message: "Task deleted!"});
    })
    .catch(function(err){
      res.send(err);
    })
};

// module.exports = exports;
