import Task from '../Models/tasksModel'

import { Types } from 'mongoose'
import { Tasks } from '@/lib/types/taskInterface/taskInterface'
import { ITask } from '@/lib/types/ModelInterface/taskmodel.interface';

export const addTasks = async (userid: Types.ObjectId, body: Tasks) => {

    const { taskTitle, taskDesc, status, category } = body;
    const newTask = new Task<ITask>({
        taskTitle: taskTitle,
        taskDesc: taskDesc,
        status: status,
        category: category,
        createdBy: userid
    })
    const new_task = await newTask.save();

    if (!new_task) {
        throw new Error('server error try again!')
    }
    return new_task
}

export const getAllTasks = async (userid: Types.ObjectId) => {
    const tasks = await Task.find({ createdBy: userid })
    return tasks
}

export const deleteTasks = async (id : Types.ObjectId) => {
   
        const task = await Task.findByIdAndDelete({ _id: id });
        if (!task) {
            throw new Error("'Already Deleted' ")
        }
        return task;
}

export const updateTasks = async (id, body) => {
    const { taskTitle, taskDesc, status, category } = body;
    const task = await Task.findById(id);
    if (!task) {
        throw new Error("Task Not Found");
    }

    task.taskTitle = taskTitle;
    task.taskDesc = taskDesc;
    task.status = status;
    task.category = category;

    await task.save();
    return task;
}

export const getTasks = async (id) => {

    const task = await Task.findById(id);

    console.log('task is', task)
    if (!task) {
        throw new Error('no task availbale')
    }
    return task;
}