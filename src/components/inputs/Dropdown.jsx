import React, { useRef, useEffect, useState } from "react";
import { useSelect } from "react-select-search";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import tether from '../../assets/icons/tether.svg'
export default function Dropdown(props) {
  const {
    selectOptions,
    selectValue,
    selectMultiple,
    selectDisabled,
    nameProp,
    valueProp,
    onChange,
  } = props.customSelectProps;
  const [formattedOptions, setFormattedOptions] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState("left"); // State to track dropdown position
  const dropdownRef = useRef(null);

  useEffect(() => {
    const formatted = selectOptions?.map((data) => ({
      value: data[valueProp],
      name: nameProp(data),
    }));
    setFormattedOptions(formatted);
  }, [selectOptions, valueProp, nameProp]);

  const [snapshot, valueProps, optionProps] = useSelect({
    options: formattedOptions,
    value: selectValue,
    multiple: selectMultiple,
    disabled: selectDisabled,
  });

  useEffect(() => {
    if (onChange && snapshot.value) {
      onChange(snapshot.value);
    }
  }, [snapshot.value, onChange]);
  useEffect(() => {
    // Adjust dropdown position when the dropdown is opened
    if (snapshot.focus && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const containerRect =
        dropdownRef.current.parentNode.getBoundingClientRect();

      if (dropdownRect.right > window.innerWidth) {
        setDropdownPosition("right"); // Shift dropdown to the right
      } else {
        setDropdownPosition("left"); // Default position
      }
    }
  }, [snapshot.focus]);

  return (
    <div className="custom-select-search">
      <button
        className="inline-flex items-center rounded-full bg-gray-100 px-3 py-2 text-xs font-medium text-gray-600"
        {...valueProps}
        disabled={selectDisabled}>
        {snapshot.displayValue == "USD" ? (
          <img
            src="https://sika-static-assests.s3.amazonaws.com/flags/US.png"
            className="h-4 w-4 mr-1"
            alt=""
          />
        ) : (
          <img
            src={tether}
            className="h-4 w-4 mr-1"
            alt=""
          />
        )}
     
        <span className="pill-text">{snapshot.displayValue || "USD"}</span>
        <ChevronDownIcon className="font-semibold size-4" />
      </button>
      {snapshot.focus && (
        <ul
          ref={dropdownRef}
          className={`select-dropdown ${
            dropdownPosition === "right" ? "dropdown-right" : ""
          }`}>
          {snapshot.options?.map((option, index) => (
            <li key={option.value} className="select-dropdown-item">
              <button
                className="select-dropdown-button"
                {...optionProps[index]}
                value={option.value}>
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
