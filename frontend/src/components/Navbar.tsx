"use client";

import axios from "axios";

import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import { CgProfile } from "react-icons/cg";

import { useRouter } from "next/navigation";

import { logout } from "@/lib/features/authSlice";
import { useAppSelector } from "@/lib/redux/type";

const Navbar = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = useAppSelector((store ) => store.Auth);

  const handleLogout = async () => {
    try {
      const response = await axios(
        `/api/auth/logout`,
        {
          withCredentials: true,
        },
      );

      if (response.status == 200) {
        dispatch(logout());
        toast.success(response.data.message);
        router.push("/login");
      }
    } catch (err) {
      console.log("error is", err);
    }
  };
  return (
    <nav className="bg-[#181824] sticky top-0 z-50 px-6 py-1  border-b border-gray-200">
      <div className="flex justify-between items-center">
        <div
          onClick={() => router.push("/")}
          className="text-white font-bold text-xl cursor-pointer hover:opacity-80 transition ml-4"
        >
          {!auth?.user && "Task Manager "}
        </div>

        <ul className="flex items-center justify-end gap-6 text-sm font-medium text-gray-300 mr-5">
          <li
            onClick={() => router.push("/")}
            className="hover:text-white cursor-pointer transition"
          >
            Home
          </li>

          {auth?.user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5  border border-gray-700">
                <CgProfile />
                <span className="text-gray-200">{auth.user.fullname}</span>
              </div>
              <li
                onClick={handleLogout}
                className="  hover:text-white cursor-pointer"
              >
                Logout
              </li>
            </div>
          ) : (
            <li
              onClick={() => router.push("/login")}
              className=" hover:text-white px-5 py-2 cursor-pointer transition shadow-blue-900/20"
            >
              Login
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
