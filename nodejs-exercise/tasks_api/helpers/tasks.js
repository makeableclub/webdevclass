var db = require('../models');

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

exports.createTask = function(req, res) {
  db.Task.create(req.body)
  .then(function(newtask){
    res.status(201).json(newtask);
  })
  .catch(function(err){
    res.send(err);
  })
  
}

module.exports = exports;
