var mongoose = require('mongoose');
mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/task-api');
mongoose.Promise = Promise;

module.exports.Task = require('./task');
module.exports.User = require('./user');
