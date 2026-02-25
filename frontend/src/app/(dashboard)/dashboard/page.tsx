"use client";

import axios from "axios";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import Loader from "@/components/Loader";
import AnalyseDataCart from "./AnalyseDataCart";

const Deshboard = () => {
  const auth = useSelector((store) => store.Auth);
  const { user } = auth;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryCounts = useMemo(() => {
    return tasks.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
  }, [tasks]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/tasks`);

        if (response.status === 200) {
          setTasks(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <div className="text-2xl">
        <span>Hii,</span> {user && user.fullname}
      </div>

      <AnalyseDataCart categoryCounts={categoryCounts} />
    </div>
  );
};

export default Deshboard;
