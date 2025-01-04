import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function TextInputDropdown(props) {
  const {
    label,
    errorMessage,
    required,
    value,
    handleChange,
    isNumber,
    rightIcon,
    textColor,
    readonly, // New prop for the right icon
    customSelectProps, // New prop for dropdown change handler
    ...inputProps
  } = props;
  const [displayValue, setDisplayValue] = useState(value || "");
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  useEffect(() => {
    console.log('custom select prop is ',customSelectProps)
    if (isNumber) {
      setDisplayValue(formatNumber(value || ""));
    } else {
      setDisplayValue(value || "");
    }
  }, [value, isNumber]);

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    if (isNumber) {
      inputValue = filterNonNumeric(inputValue);
      const unformattedValue = unformatNumber(inputValue);
      setDisplayValue(formatNumber(unformattedValue));
      handleChange({
        target: { name: e.target.name, value: unformattedValue },
      });
    } else {
      setDisplayValue(inputValue);
      handleChange(e);
    }
  };
  const filterNonNumeric = (input) => {
    // Ensure it allows only valid characters (digits and a single decimal)
    let filteredInput = input.replace(/[^0-9.]/g, "");

    // Ensure only one decimal point exists in the string
    const parts = filteredInput.split(".");
    if (parts.length > 2) {
      filteredInput = `${parts[0]}.${parts[1]}`;
    }

    // Limit to two decimal places
    if (parts[1] && parts[1].length > 2) {
      filteredInput = `${parts[0]}.${parts[1].substring(0, 2)}`;
    }

    return filteredInput;
  };

  const copyToClipboard = () => {
    if (!displayValue) {
      // toast.error("Failed to copy!");
      return;
    }

    navigator.clipboard.writeText(unformatNumber(displayValue)); // Copy unformatted value to clipboard
  
  };

  const formatNumber = (num) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const unformatNumber = (num) => {
    return num.replace(/,/g, "");
  };

  return (
    <div className="relative my-4 pb-2">
      <label
        htmlFor="price"
        className=" absolute z-10 block -top-3 px-1 bg-white ml-4 text-sm/6 font-medium text-gray-500">
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
      
        <input
          id="price"
          name="price"
          type="text"
          placeholder="0.00"
          className="block w-full rounded-md border-0 py-3  pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
        />
        <div className="absolute inset-y-0 right-2 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          {/* <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select> */}
          {customSelectProps && (<Dropdown customSelectProps={customSelectProps} />)}
         
        </div>
      </div>
    </div>
  );
}
