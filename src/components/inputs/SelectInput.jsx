import React from "react";
import Select from "react-select";

const SelectInput = ({
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
      <label
        className="absolute z-10 text-sm/6 font-medium -top-3 px-1 bg-white ml-4 text-gray-500 "
        >
        {label}
        {required && <span style={{ color: "red" }}>*</span>}
      </label>
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
            boxShadow: state.isFocused? "none" : "none",
            borderColor: state.isFocused ? "rgba(209, 213, 219, 1)":"",
          }),
          indicatorSeparator: (baseStyles, state) => ({
            ...baseStyles,
            display: "none",
            }),
          input: (baseStyles, state) => ({
            ...baseStyles,
            boxShadow: state.isFocused? "none" : "none",
            }),
          
        }}
      />
      <span id="error">{errorMessage}</span>
    </div>
  );
};

export default SelectInput;
