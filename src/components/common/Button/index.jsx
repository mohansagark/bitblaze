import React from "react";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  width,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`bg-primary text-neutral50 text-${size} p-3 hover:drop-shadow-xl hover:bg-${bgHoverColor} w-${width}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
