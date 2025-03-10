import React from "react";
import { MoonLoader } from "react-spinners";

const Button = ({ loading, onClick, children, className }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={loading}
      className={`${className} ${loading ? 'cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <div className="flex justify-center items-center">
          <MoonLoader size={20} color="#fff" />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;