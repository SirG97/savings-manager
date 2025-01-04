import { ChevronDownIcon } from "@heroicons/react/16/solid";

export default function Select({
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
    <div className="relative my-4">
      <label
        htmlFor={label}
        className="absolute -top-3 z-10 ml-4 bg-white px-1 text-sm/6 font-medium text-gray-500"
      >
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>
    
      <select
        {...register(name)}
        className={`block w-full rounded-md border-0 px-3 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm/6 ${errors?.message ? "ring-red-500 focus:ring-red-600" : ""}`}
      >
        <option value=""></option>
        {options.map((option, index) => (
          <option key={index} value={option[valueProp]}>
            {nameProp(option)}
          </option>
        ))}
      </select>
      {errors && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
    </div>
  );
}
