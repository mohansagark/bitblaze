import { useEffect } from "react";
import { useAudio } from "../../../helpers/hooks";

const Button = ({
  id = "button",
  icon,
  bgColor = "var(--color-primary)",
  bgHoverColor = "var(--color-success)",
  textColor = "#fff",
  size = "base",
  text,
  borderRadius,
  onClick = () => null,
  className = "",
  sound = false,
  disabled = false,
}) => {
  const { playSound, registerAudio } = useAudio();

  useEffect(() => {
    registerAudio(id);
  }, [registerAudio, id]);

  const onPress = () => {
    if (disabled) return;
    if (sound) playSound(id);
    onClick();
  };

  return (
    <button
      id={id}
      type="button"
      onClick={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "var(--color-neutral-400)" : bgColor,
        borderRadius,
        color: textColor,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
      className={`w-full p-3 text-${size} transition-all duration-200 ${
        disabled ? "opacity-60" : "hover:drop-shadow-xl"
      } ${!disabled ? `hover:bg-[${bgHoverColor}]` : ""} ${className}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
