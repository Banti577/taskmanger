const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskTitle: {
        type: String,
        required: true,
    },
    taskDesc: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Upcoming', 'Current', 'Completed'],
        default: 'Upcoming',
        required:true

    },
    category:{
        type:String,
        enum:['Design', 'Development', 'Management', 'Finance', 'Operations', 'Sales', 'Other'],
        default:'Other',
        required:true,
   
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }
},{timestamps:true})
//userSchema.index({ taskTitle: text });

module.exports = mongoose.model('task', taskSchema);