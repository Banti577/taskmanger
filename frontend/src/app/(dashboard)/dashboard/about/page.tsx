import React from "react";

const About = () => {
  return (
    <div className=" flex items-center justify-center p-10  ">
      <section className={`bg-[#f4f4f4] p-10 rounded  shadow`}>
        <h2 className="text-2xl text-amber-400"> Tasks Management</h2>
        <p className="mt-2 mb-2 text-green-400">
          Keep track of your daily, and monthly goals effortlessly.
        </p>

        <h2>
          A task management website is a digital platform designed to help
          individuals and teams organize, prioritize, and track tasks to boost
          productivity. It acts as a centralized hub for creating to-do lists,
          assigning responsibilities, setting deadlines, and tracking progress
          through Kanban boards, Gantt charts, or calendars.
        </h2>
      </section>
    </div>
  );
};

export default About;
