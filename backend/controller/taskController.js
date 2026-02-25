const Task = require('../Models/tasksModel');

const addTasks = async (req, res) => {
    try {
        const { taskTitle, taskDesc, status, category } = req.body;
        const newTask = new Task({
            taskTitle: taskTitle,
            taskDesc: taskDesc,
            status: status,
            category: category,
            createdBy: req.user.id
        })
        await newTask.save();
        return res.status(201).json({ msg: "Task Added" })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ msg: "server error try again!" })
    }
}

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ createdBy: req.user.id })
        return res.status(200).json(tasks)

    } catch (err) {
        return res.status(500).json({ msg: 'something went wrong Please Try Again!' })
    }
}

const deleteTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete({ _id: id });
        if (!task) return res.status(404).json({ msg: 'Already Deleted' });
        return res.status(200).json({ msg: 'Deleted SuccessFully' });
    } catch (err) {
        return res.status(500).json({ msg: 'Deletion Faild' })
    }
}

const updateTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskTitle, taskDesc, status, category } = req.body;
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ error: 'Task Not Found' });

        task.taskTitle = taskTitle;
        task.taskDesc = taskDesc;
        task.status = status;
        task.category = category;

        await task.save();
        return res.status(200).json({ msg: 'Task is Updated' });

    } catch (err) {
        return res.status(500).json({
            error: 'Update failed'
        });

    }
}

const getTasks = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findById(id);
        return res.status(200).json(task);

    } catch (err) {
        return res.status(500).json({ msg: ' Faild Server error' })
    }

}

module.exports = { addTasks, getAllTasks, deleteTasks, updateTasks, getTasks }