import { useEffect, useState } from "react";

const useDebounce = (value, sleep) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(value);
    }, sleep);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return state;
};

export default useDebounce;
