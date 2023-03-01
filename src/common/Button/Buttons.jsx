import { CircularProgress } from "@mui/material";

function Buttons({ type, handleClick, isLoading, text, classname }) {
  return (
    <button
      type={type}
      className={`${classname} ${isLoading ? "load" : ""}`}
      disabled={isLoading}
      onClick={handleClick}
    >
      {isLoading ? <CircularProgress size={20} color="error" /> : text}
    </button>
  );
}

export default Buttons;
