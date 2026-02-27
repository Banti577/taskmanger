'use client'

import axios from 'axios';

import { useParams } from 'next/navigation'
import Link from 'next/link';

import toast from "react-hot-toast";

import { useEffect, useState } from 'react'

import Loader from '@/components/Loader';
import { TaskDocument } from '@/lib/types/taskInterface/taskInterface'
import { useAppSelector } from '@/lib/redux/type';

const TasksdetailsPage = () => {

    const accessToken = useAppSelector(store => store.Auth.accessToken)
    const { id } = useParams();
    const [task, setTask] = useState<TaskDocument>(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if (!accessToken) return
        const fetchTask = async () => {
            try {
                setLoading(true)
                const response = await axios(`/api/tasks/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken} `
                    }
                })
                setTask(response.data)
            } catch (err) {
                toast.error(
                    err?.response?.data?.msg ||
                    err?.response?.data?.message ||
                    err?.response?.data ||
                    "no task available",
                );
            }
            finally {
                setLoading(false);
            }
        }
        fetchTask();
    }, [accessToken])

    const handleDeleteTask = async (id) => {
        const shouldDelete = confirm("Are you sure you want to delete this task ?");

        if (!shouldDelete) {
            return
        }
        try {
            const response = await axios.delete(`/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setTask(null)

            toast.success(response.data.msg || response.data);

        } catch (err) {
            toast.error(
                err?.response?.data?.msg ||
                err?.response?.data?.message ||
                err?.response?.data ||
                "no task available",
            );
            console.log(err)
        }

    }

    if (loading) return <Loader />


    const statusColors = {
        Upcoming: "bg-blue-500",
        Current: "bg-green-500",
        Completed: "bg-gray-400"
    }

    return (
        <>
            {task ? (
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">{task.taskTitle}</h1>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[task.status]}`}> {task.status}
                        </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                        <p className="text-sm text-gray-500">Category: {task.category}</p>
                        <p className="text-gray-700 mt-2 text-lg">{task.taskDesc}</p>
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-500">
                        <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
                        <p>Last Updated: {new Date(task.updatedAt).toLocaleString()}</p>
                    </div>

                    <div className='mt-5'>
                        <Link href={`/dashboard/edit-tasks/${task._id}`}>
                            <button className='bg-[#e7e7e7] p-1 w-15 cursor-pointer rounded'>Edit </button>
                        </Link>
                        <button onClick={() => handleDeleteTask(task._id)} className='bg-red-500 p-1 w-15 ml-5 cursor-pointer rounded'>Delete </button>

                    </div>
                </div>) : ("No Task Found")}
        </>
    );
}

export default TasksdetailsPage