"use client";

import axios from "axios";

import toast from "react-hot-toast";

import { useState } from "react";

import { Task } from '@/lib/types/taskInterface/taskInterface'
import { useAppSelector } from "@/lib/redux/type";

const AddTasks = () => {
  const [task, setTask] = useState<Task>({
    taskTitle: '',
    taskDesc: '',
    status: "Upcoming",
    category: "Other",
  });

  const auth = useAppSelector((store) => store.Auth);
  const {accessToken } = auth;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task.taskDesc == "" || task.taskTitle == "") {
      alert("ALL fildes are required!");
      return;
    }

    handleAddTask();
  };

  const handleAddTask = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/tasks`,
        task, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
      );
      setTask({
        taskTitle: "",
        taskDesc: "",
        status: "Upcoming",
        category: "Other",
      });

      toast.success(response.data.msg || response.data || response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="p-4 border rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

      <div className="mb-4">
        <label
          htmlFor="taskTitle"
          className="block text-sm font-medium text-gray-700"
        >
          Task Title
        </label>
        <input
          type="text"
          id="taskTitle"
          name="taskTitle"
          value={task.taskTitle}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="taskDesc"
          className="block text-sm font-medium text-gray-700"
        >
          Task Description
        </label>
        <textarea
          id="taskDesc"
          name="taskDesc"
          value={task.taskDesc}
          onChange={handleChange}
          required
          // rows="2"
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        ></textarea>
      </div>

      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          name="status"
          value={task.status}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
          {["Upcoming", "Current", "Completed"].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={task.category}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        >
          {[
            "Design",
            "Development",
            "Management",
            "Finance",
            "Operations",
            "Sales",
            "Other",
          ].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 cursor-pointer text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Adding..." : " Add Task"}
      </button>
    </form>
  );
};

export default AddTasks;
