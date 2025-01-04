import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const TextInput = ({
  label,
  required,
  type,
  placeholder,
  name,
  rightIcon,
  register,
  errors,
}) => (
  <div className="relative my-4 pb-2">
    <label
      htmlFor="email"
      className="absolute -top-3 z-10 ml-3 block bg-white px-1 text-sm/6 font-medium text-gray-500"
    >
      {label}
      {required && <span style={{ color: "red" }}>*</span>}
    </label>
    <div className="relative mt-2 rounded-md shadow-sm">
      <input
        {...register(name)}
        type={type?type:''}
        placeholder={placeholder}
        className={`block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1  ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm/6 ${errors?.message? "focus:ring-red-600 ring-red-500":""}`}
      />
      <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3">
        {rightIcon}
      </div>
    </div>

    {errors && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
  </div>
);
