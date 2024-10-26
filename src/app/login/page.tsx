"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDarkModeStore } from "@/stores/darkModeStore"; // Import Zustand store

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const { darkMode } = useDarkModeStore(); // Use Zustand store for dark mode
  const router = useRouter();

  const onSubmit = (data: LoginFormInputs) => {
    Cookies.set("user", JSON.stringify(data), { expires: 7 });
    toast.success("User logged in successfully");
    router.push("/wishlist");
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen transition-colors ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <div
        className={`shadow-lg rounded-lg p-8 w-full max-w-md text-center ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl font-semibold mb-6 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className={`block text-sm font-medium mb-2 text-left ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              className={`w-full px-4 py-2 border rounded-md ${
                darkMode
                  ? "text-gray-100 bg-gray-700 border-gray-600"
                  : "text-gray-900 bg-gray-100 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your username"
              defaultValue={"mock@gmail.com"}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className={`block text-sm font-medium mb-2 text-left ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className={`w-full px-4 py-2 border rounded-md ${
                darkMode
                  ? "text-gray-100 bg-gray-700 border-gray-600"
                  : "text-gray-900 bg-gray-100 border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your password"
              defaultValue={"mock123"}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md font-semibold ${
              darkMode ? "bg-purple-600 text-white" : "bg-purple-600 text-white"
            }`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
