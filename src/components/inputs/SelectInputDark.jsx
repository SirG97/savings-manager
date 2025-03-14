import React from "react";
import Select from "react-select";

const SelectInputDark = ({
  label,
  options,
  valueProp,
  nameProp,
  handleOptionChange,
  errorMessage,
  required,
  defaultValue,
  value, // Controlled component's current value
  ...inputProps
}) => {
  return (
    <div className="relative my-3">
      {/* Label */}
      <label
        className="absolute z-10 text-sm/6 font-medium -top-3 px-1 bg-gray-900 ml-4 text-gray-300" // Updated for dark mode
      >
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>

      {/* React-Select Dropdown */}
      <Select
        options={options}
        getOptionLabel={nameProp}
        getOptionValue={valueProp}
        onChange={handleOptionChange}
        isClearable
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "0.375rem",
            paddingTop: 6,
            paddingBottom: 6,
            backgroundColor: "#1f2937", // bg-gray-800
            borderColor: state.isFocused ? "#4f46e5" : "#374151", // border-indigo-600 when focused, border-gray-700 otherwise
            boxShadow: state.isFocused ? "0 0 0 1px #4f46e5" : "none", // Focus ring
            "&:hover": {
              borderColor: "#4f46e5", // Hover border color
            },
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: "#1f2937", // bg-gray-800
            borderColor: "#374151", // border-gray-700
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isSelected
              ? "#4f46e5" // bg-indigo-600 for selected option
              : state.isFocused
              ? "#374151" // bg-gray-700 for focused option
              : "#1f2937", // bg-gray-800 for other options
            color: state.isSelected ? "#ffffff" : "#f3f4f6", // text-white for selected, text-gray-100 for others
            "&:hover": {
              backgroundColor: "#374151", // bg-gray-700 on hover
            },
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#f3f4f6", // text-gray-100
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: "#f3f4f6", // text-gray-100
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#9ca3af", // text-gray-400
          }),
          indicatorSeparator: (baseStyles) => ({
            ...baseStyles,
            display: "none", // Remove the separator
          }),
          dropdownIndicator: (baseStyles) => ({
            ...baseStyles,
            color: "#9ca3af", // text-gray-400 for the dropdown arrow
            "&:hover": {
              color: "#f3f4f6", // text-gray-100 on hover
            },
          }),
          clearIndicator: (baseStyles) => ({
            ...baseStyles,
            color: "#9ca3af", // text-gray-400 for the clear icon
            "&:hover": {
              color: "#f3f4f6", // text-gray-100 on hover
            },
          }),
        }}
      />

      {/* Error Message */}
      {errorMessage && (
        <span id="error" className="mt-1 text-xs text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default SelectInputDark;