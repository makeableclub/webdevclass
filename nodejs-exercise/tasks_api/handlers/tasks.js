var db = require('../models');

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

/*
exports.createTask_old = function(req, res) {
  db.Task.create(req.body)
  .then(function(newtask){
    res.status(201).json(newtask);
  })
  .catch(function(err){
    res.send(err);
  })
}
*/

// /api/users/:id/tasks
exports.createTask = async function(req, res, next) {
    try {
        let task = await db.Task.create({
            name: req.body.name,
            completed: req.body.completed,
            user: req.params.id
        });

        console.log("userid: " + req.params.id);

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

// /api/users/:id/tasks/:taskId
exports.updateTask = async function(req, res){
    try {
        console.log("update: " + req.params.taskId);

        let task = await db.Task.findOneAndUpdate(
              {_id: req.params.taskId},
              req.body,
              {new: true});

        console.log("update: " + task);
        return res.status(200).json(task);
    }
    catch(err) {
        console.log("update: " + err);
        next(err);
    }
};

exports.deleteTask = async function(req, res){
    try {
        let retvalue = await db.Task.remove({_id: req.params.taskId})
        res.status(200).json({message: "Task deleted!"});
    }
    catch(err) {
        res.send(err);
    }
};

// module.exports = exports;
