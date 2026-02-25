import { memo } from "react";

import { statusColors } from "./utils/Constants";

const AnalyseDataCart = memo(({ categoryCounts }) => {
  return (
    <div className=" flex justify-center">
      {Object.entries(categoryCounts).map(([status, count]) => {
        return (
          <div
            key={status}
            className="bg-[#f4f4f4] w-60 h-50 p-1 m-5 flex flex-col items-center justify-center rounded shadow-lg"
          >
            <span
              className={`${statusColors[status]} text-2xl p-1 rounded mb-1`}
            >
              {status} Task
            </span>
            <span className="font-bold text-5xl">{count}</span>
          </div>
        );
      })}
    </div>
  );
});

export default AnalyseDataCart;
