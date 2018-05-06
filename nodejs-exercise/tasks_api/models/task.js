const mongoose = require('mongoose');
const User = require("./user");

var taskSchema = new mongoose.Schema({
    name: {
            type: String,
            required: 'Task name field is required'
        },
    completed: {
            type: Boolean,
            default: false
        },
    user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    created_date: {
            type: Date,
            default: Date.now
        }
});


// if we delete a task, we need to remove the task id from the list under that user
taskSchema.pre('remove', async function(next){
    try {
        let user = await User.findById(this.userId);
        user.task.remove(this.id);
        await user.save();
        return next();
    }
    catch(err) {
        return next(err);
    }
})

var Task = mongoose.model('Task', taskSchema);
module.exports = Task;
