import React from "react";

const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.target.style.backgroundColor = "#45a049";
      }}
      onMouseOut={(e) => {
        e.target.style.backgroundColor = "#4CAF50";
      }}
    >
      {children}
    </button>
  );
};

export default Button;
