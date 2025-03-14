import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function SelectDark({
  label,
  placeholder,
  name,
  required,
  register,
  options,
  errors,
  nameProp,
  valueProp,
  defaultValue,
  ...inputProps
}) {
  return (
    <div className="relative my-2">
      {/* Label */}
      <label
        htmlFor={label}
        className=" z-10 ml bg-gray-900 px-1 text-sm/6 font-medium text-gray-300" // Updated for dark mode
      >
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>

      {/* Select Dropdown */}
      <select
        {...register(name)}
        className={`block w-full rounded-md border-0 px-3 py-3 bg-gray-800 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${
          errors?.message ? "ring-red-500 focus:ring-red-600" : ""
        }`} // Updated for dark mode
      >
        <option value="" className="bg-gray-800 text-gray-100">
          {placeholder || "Select an option"}
        </option>
        {options.map((option, index) => (
          <option
            key={index}
            value={option[valueProp]}
            className="bg-gray-800 text-gray-100"
          >
            {nameProp(option)}
          </option>
        ))}
      </select>

      {/* Error Message */}
      {errors && (
        <p className="mt-1 text-xs text-red-500">{errors.message}</p> // Error message remains red for visibility
      )}
    </div>
  );
}