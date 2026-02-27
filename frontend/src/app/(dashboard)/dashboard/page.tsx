"use client";

import axios from "axios";

import { useEffect, useMemo, useState } from "react";


import { CategoryCount } from '@/lib/types/frontendInterface'
import { useAppSelector } from "@/lib/redux/type";

import Loader from "@/components/Loader";
import AnalyseDataCart from "./AnalyseDataCart";


const Deshboard = () => {
  const auth = useAppSelector((store) => store.Auth);
  const { user, accessToken } = auth;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryCounts: CategoryCount = useMemo(() => {
    return tasks.reduce((acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    }, {});
  }, [tasks]);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);

        const response = await axios.get(`/api/tasks`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

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
        <span>Hii,</span> {user && user.fullname || user.fullName}
      </div>

      <AnalyseDataCart categoryCounts={categoryCounts} />
    </div>
  );
};

export default Deshboard;
