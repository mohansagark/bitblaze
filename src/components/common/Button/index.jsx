import React from "react";

const Button = ({
  icon,
  bgColor,
  bgHoverColor,
  size,
  text,
  borderRadius,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: bgColor, borderRadius }}
      className={`w-full bg-primary  text-${size} p-3 hover:drop-shadow-xl hover:bg-${bgHoverColor} ${className}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
