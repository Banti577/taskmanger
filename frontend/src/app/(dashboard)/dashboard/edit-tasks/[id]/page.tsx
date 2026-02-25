"use client";

import axios from "axios";

import toast from "react-hot-toast";

import { useParams, useRouter } from "next/navigation";

import { useState, useEffect } from "react";

import { Task, TaskDocument } from '@/lib/types/interface'

const EditTasks = () => {

  const { id } = useParams();

  const [task, setTask] = useState<Task>({
    taskTitle: '',
    taskDesc: '',
    status: "Upcoming",
    category: "Other",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await axios<TaskDocument>(`/api/tasks/${id}`);
        setTask(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, []);

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
      const response = await axios.put(`/api/tasks/${id}`,
        task);

      setTask({
        taskTitle: '',
        taskDesc: '',
        status: 'Upcoming',
        category: "Other",
      });

      console.log('response is ', response)

      toast.success(response?.data?.msg || response?.data?.data || response?.data?.data|| response);
      router.push(`/dashboard/tasks/${id}`);
    } catch (err) {
      console.log(err);
      console.log('errr is ', err.response)
      toast.success(err.response.data?.msg || err.response.data || err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

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
        {loading ? "Updating Task..." : " Update Task"}
      </button>
    </form>
  );
};

export default EditTasks;
