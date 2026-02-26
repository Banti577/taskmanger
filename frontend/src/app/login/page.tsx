"use client";

import axios from "axios";

import toast from "react-hot-toast";

import { IoIosEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { validators } from "@/constants/validation";
import { checkAuth } from "@/lib/features/authSlice";
import { FormErrorsInterface } from "@/lib/types/interface";

import { useAppDispatch, useAppSelector } from '@/lib/redux/type';

import { SignupUser } from '@/lib/types/AuthInterface/authInterface'

const LoginAndSignupPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isLogin, setLogin] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, isShowPassword] = useState(false);
  const [input, setInput] =
    useState<
      SignupUser>
      ({
        fullname: '',
        email: '',
        password: "",
        gender: "",
      });

  const [error, setError] = useState<FormErrorsInterface>({
    fullname: "",
    email: "",
    password: "",
    gender: "",
  });

  const hasError = Object.values(error).some((err) => err !== "");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));

    if (validators[name]) {
      setError((p) => ({ ...p, [name]: validators[name](value) }));
    }
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (hasError) {
      toast.error("Please Enter filed in specified format");
      return;
    }
    setError({
      fullname: "",
      email: "",
      password: "",
      gender: "",
    });

    if (!isLogin && (!input.fullname || !input.gender)) {
      toast.error("Please fill all fields");
      return;
    }

    if (!input.email || !input.password) {
      toast.error("Email and password are required");
      return;
    }

    if (isLogin) {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  const handleSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", input);

      setInput({
        fullname: "",
        email: "",
        password: "",
        gender: "",
      });
      dispatch(checkAuth());
      toast.success("Signup successful. You can login now.");

      setInput({
        fullname: "",
        email: "",
        password: "",
        gender: "",
      });

      setLogin(true);
    } catch (err) {
      console.log(err?.response?.data?.msg || err?.response?.data);
      toast.error(
        err?.response?.data?.msg || err?.response?.data || "Signup failed",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", input);

      if (response.status === 200) {
        console.log("login ", response);

        toast.success(response.data.msg || response.data || response);
        dispatch(checkAuth());
        router.push("/dashboard");
      }

      setInput({
        fullname: "",
        email: "",
        password: "",
        gender: "",
      });
    } catch (err) {
      console.log(err);
      toast.error(
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        err?.response?.data ||
        "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className=" m-7 flex justify-center items-center  ">
        <div className="border p-3 w-[32%]">
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-center font-semibold mb-2 text-2xl">
              {!isLogin ? " Create Account" : "Login"}
            </h1>
            {!isLogin && (
              <div>
                <p className="text-sm text-gray-600 mb-1 uppercase">fullname</p>
                <label htmlFor="fullname">
                  <input
                    value={input.fullname}
                    className="border p-2 mb-2 w-full"
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Enter FullName"
                    onChange={(e) => handleInputChange(e)}
                  />
                </label>

                {error.fullname ? (
                  <p className="text-red-400 text-xs">{error.fullname}</p>
                ) : (
                  <p className="text-white/5 text-xs p-0">'</p>
                )}
              </div>
            )}

            <div>
              <p className="text-sm text-gray-600 mb-1 uppercase">email</p>
              <label htmlFor="email">
                <input
                  value={input.email}
                  className="border p-2 mb-2 w-full"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  onChange={handleInputChange}
                />
              </label>

              {error.email ? (
                <p className="text-red-400 text-xs">{error.email}</p>
              ) : (
                <p className="text-white/5 text-xs p-0">'</p>
              )}
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1 uppercase">password</p>
              <label htmlFor="password">
                <div className="relative">
                  <input
                    value={input.password}
                    className="border p-2 mb-2 w-full"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={(e) => handleInputChange(e)}
                  />

                  <button
                    onClick={() => isShowPassword(!showPassword)}
                    type="button"
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {showPassword ? <IoIosEyeOff /> : <IoMdEye />}
                  </button>
                </div>
              </label>
              {error.password ? (
                <p className="text-red-400 text-xs">{error.password}</p>
              ) : (
                <p className="text-white/5 text-xs p-0">'</p>
              )}
            </div>

            {!isLogin && (
              <div>
                <p className="text-sm text-gray-600 mb-2 uppercase">Gender</p>
                <div className="flex gap-4 text-sm mb-2 ">
                  {["male", "female", "other"].map((g) => (
                    <label key={g} className="flex items-center gap-1">
                      <input
                        className="cursor-pointer"
                        type="radio"
                        name="gender"
                        value={g}
                        checked={input.gender === g}
                        onChange={(e) => handleInputChange(e)}
                      />
                      <span className="capitalize">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <button className="cursor-pointer bg-blue-500 p-2 w-full text-white">
                {isLogin ? "Login" : "Signup"}
              </button>
            </div>

            <p className="flex justify-center mb-2">
              {!isLogin ? "Already have an account?" : "Create New Account"}
              <button
                onClick={() => setLogin(!isLogin)}
                className="cursor-pointer ml-2 text-green-500"
                type="button"
              >
                {!isLogin ? "Login" : "Signup"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAndSignupPage;
