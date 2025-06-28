import { useEffect } from "react";
import { useAudio } from "../../../helpers/hooks";

const Button = ({
  id = "button",
  icon,
  size = "base",
  text,
  borderRadius,
  onClick = () => null,
  className = "",
  sound = false,
  disabled = false,
  variant = "primary", // "primary" or "secondary"
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

  const isPrimary = variant === "primary";

  const baseStyles = {
    backgroundColor: disabled
      ? "var(--color-neutral-400)"
      : isPrimary
      ? "var(--color-primary)"
      : "transparent",
    color: disabled
      ? "var(--color-neutral-100)"
      : isPrimary
      ? "var(--color-primary-text)"
      : "var(--color-primary)",
    border: isPrimary ? "none" : "1px solid var(--color-primary)",
    borderRadius: borderRadius || "0.5rem",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <button
      id={id}
      type="button"
      onClick={onPress}
      disabled={disabled}
      style={baseStyles}
      className={`w-full p-3 text-${size} ${
        disabled ? "opacity-60" : "hover:opacity-90 hover:drop-shadow-xl"
      } ${className}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
