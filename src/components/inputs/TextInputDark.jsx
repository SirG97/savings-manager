import React from "react";
import { Controller } from "react-hook-form";

export const TextInputDark = ({
  label,
  required,
  type,
  placeholder,
  name,
  rightIcon,
  register,
  errors,
}) => (
  <div className="relative my-2 pb-2">
    {/* Label */}
    <label
      htmlFor={name}
      className=" z-10  block bg-gray-900 px-1 text-sm/6 font-medium text-gray-300" // Updated for dark mode
    >
      {label}
      {required && <span style={{ color: "red" }}>*</span>}
    </label>

    {/* Input Field */}
    <div className="relative rounded-md shadow-sm">
      <input
        {...register(name)}
        type={type || "text"}
        placeholder={placeholder}
        className={`block w-full rounded-md border-0 px-3 py-3 bg-gray-800 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${
          errors?.message ? "focus:ring-red-600 ring-red-500" : ""
        }`} // Updated for dark mode
      />
      {/* Right Icon (if provided) */}
      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3">
        {rightIcon}
      </div>
    </div>

    {/* Error Message */}
    {errors && (
      <p className="mt-1 text-xs text-red-500">{errors.message}</p> // Error message remains red for visibility
    )}
  </div>
);