import Link from "next/link";

import { statusColors } from "../utils/Constants";

import { TaskCardProps } from '@/lib/types/interface'

const TaskCard = ({ tasks }: TaskCardProps) => {

  return (
    <div>
      <h1 className="font-semibold text-2xl">Total Tasks: {tasks.length}</h1>
      <div className="flex flex-wrap justify-center items-center ">
        {tasks.map((item) => {
          return (
            <div
              key={item._id}
              className="shadow-lg w-[28%]  h-70  rounded p-3 m-5 cursor-pointer"
            >
              <div className="flex justify-around items-center mb-3">
                <h1 className="bg-red-300 p-1 text-red-900 rounded">
                  {item.category}
                </h1>

                <div>{new Date(item.updatedAt).toLocaleDateString()}</div>
              </div>

              <div className="border-t border-gray-200 ">
                <h1 className="text-2xl font-semibold  mt-5 mb-5  ">
                  {item.taskTitle.length > 30
                    ? item.taskTitle.substring(0, 30) + "..."
                    : item.taskTitle}
                </h1>
                <h2 className=" h-10">
                  {item.taskDesc.length > 50
                    ? item.taskDesc.substring(0, 50) + "..."
                    : item.taskDesc}
                </h2>
              </div>

              <div className="flex justify-around items-center mt-3 border-t border-gray-200 p-3 ">
                <p className={`${statusColors[item.status]} p-1 rounded`}>
                  {item.status}
                </p>

                <Link
                  href={`/dashboard/tasks/${item._id}`}>
                  <p
                    className="bg-[#d6632a] p-1 cursor-pointer rounded"
                  >
                    More
                  </p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskCard;
