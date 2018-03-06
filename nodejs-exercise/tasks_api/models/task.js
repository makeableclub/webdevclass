var mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
    name: {
            type: String,
            required: 'Task name field is required'
        },
    completed: {
            type: Boolean,
            default: false
        },
    created_date: {
            type: Date,
            default: Date.now
        }
});

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;
