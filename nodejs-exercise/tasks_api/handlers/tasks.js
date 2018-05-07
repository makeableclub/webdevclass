var db = require('../models');

exports.getTasks_old = function(req, res) {
  db.Task.find()
  .then(function(tasks){
    console.log(tasks);
    res.send(tasks);
  })
  .catch(function(err){
    res.send(err);
  })
}

exports.getTasks = async function(req, res, next) {
    try {
        let tasks = await db.Task.find({
            user: req.params.id
        });
        return res.status(200).json(tasks);
    }
    catch(err) {
        next(err);
    }
}

exports.createTask_old = function(req, res) {
  db.Task.create(req.body)
  .then(function(newtask){
    res.status(201).json(newtask);
  })
  .catch(function(err){
    res.send(err);
  })
}


// /api/users/:id/tasks
exports.createTask = async function(req, res, next) {
    try {
        let task = await db.Task.create({
            name: req.body.name,
            completed: req.body.completed,
            user: req.params.id
        });

        let taskOwner = await db.User.findById(req.params.id);
        taskOwner.tasks.push(task.id);
        await taskOwner.save();

        // need to information to send back
        let returnTask = await db.Task.findById(task._id).populate("user",{
            username: true,
            profileImageUrl: true
        });

        return res.status(200).json(returnTask);
    }
    catch(err) {
        next(err);
    }
}


//   /api/tasks/:taskId
exports.getTask_old = function(req, res){
    db.Task.findById(req.params.taskId)
    .then(function(task){
      res.send(task);
    })
    .catch(function(err){
      res.send(err);
    })
};


// /api/users/:id/tasks/:taskId
exports.getTask = async function(req, res, next) {
    try {
        let task = await db.Task.findById(req.params.taskId);
        return res.status(200).json(task);
    }
    catch(err) {
        next(err);
    }
}

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
