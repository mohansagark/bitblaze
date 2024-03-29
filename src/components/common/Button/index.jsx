import { useEffect } from "react";
import { useAudio } from "../../../helpers/hooks";

const Button = ({
  id = "button",
  icon,
  bgColor,
  bgHoverColor,
  size,
  text,
  borderRadius,
  onClick = () => null,
  className,
  sound = false,
}) => {
  const { playSound, registerAudio } = useAudio();

  useEffect(() => {
    registerAudio(id);
  }, [registerAudio, id]);

  const onPress = () => {
    if (sound) playSound(id);
    onClick();
  };

  return (
    <button
      id={id}
      type="button"
      onClick={onPress}
      style={{ backgroundColor: bgColor, borderRadius }}
      className={`w-full bg-primary  text-${size} p-3 hover:drop-shadow-xl hover:bg-${bgHoverColor} ${className}`}
    >
      {icon} {text}
    </button>
  );
};

export default Button;
