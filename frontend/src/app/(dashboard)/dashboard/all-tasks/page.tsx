"use client";

import axios from "axios";

import { useEffect, useState } from "react";

import Loader from "@/components/Loader";
import TaskCard from "./TaskCard";

import { TaskDocument } from "@/lib/types/taskInterface/taskInterface";
import { useAppSelector } from "@/lib/redux/type";

const Viewtasks = () => {
  const [tasks, setTasks] = useState<TaskDocument[]>([]);

  const [loading, setLoading] = useState(false);

  const auth = useAppSelector((store) => store.Auth);
  const { accessToken } = auth;
  useEffect(() => {
    if (!accessToken) return;
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get<TaskDocument[]>(`/api/tasks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        if (response.status === 200) {

          setTasks(response.data);

        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [accessToken]);

  console.log(tasks)

  if (loading) return <Loader />
  return (
    <div>
      <div>
        <TaskCard tasks={tasks} />
      </div>
    </div>
  );
};

export default Viewtasks;

