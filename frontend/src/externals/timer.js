import { useEffect, useState } from "react";

export default function useTimer(value, delay) {
  const [change, setChange] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setChange(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return change;
}