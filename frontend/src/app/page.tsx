"use client"

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (

    <div className=" flex items-center justify-center p-10  ">
      <section className={`bg-[#f4f4f4] p-10 rounded  shadow`}>
        <h2 className="text-2xl text-amber-400" > Tasks Management</h2>
        <p>Keep track of your daily, and monthly goals effortlessly.</p>
        <button onClick={() => router.push('/dashboard')} className="bg-green-500 p-1 mt-5 rounded cursor-pointer">Go to Dashboard</button>

      </section>
    </div>
  );
}
export default Home
