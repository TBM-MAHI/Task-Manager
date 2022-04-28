const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { // validation properties in "name" property/table column
        type: String,
        required: true,
        maxLength: 30,
        trim:true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userID: {
        type: String,
        required:true
    },
    userName: {
        type: String,
        required:true
}
})
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 15,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
})

const Task = mongoose.model('Task', TaskSchema)  // Task is model/class/DATABASE table
const User = mongoose.model('User', UserSchema)
//module.exports = Task;
module.exports = { Task, User };