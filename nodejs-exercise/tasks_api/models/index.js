var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/task-api',{
  keepAlive: true
});

module.exports.Task = require('./task');
module.exports.User = require('./user');
