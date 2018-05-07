var express = require('express');

// var router = express.Router();
// need to specify "mergeParams", for new prefixes: /api/users/:id/tasks/:taskId
var router = express.Router({ mergeParams: true });

var handler = require("../handlers/tasks.js");

// old prefix:  /api/tasks
// new prefix:  /api/users/:id/tasks
router.route('/')
    .get(handler.getTasks)
    .post(handler.createTask);

// old prefix:  /api/tasks/:taskId
// new prefix:  /api/users/:id/tasks/:taskId
router.route('/:taskId')
    .get(handler.getTask)
    .put(handler.updateTask)
    .delete(handler.deleteTask);

module.exports = router;
