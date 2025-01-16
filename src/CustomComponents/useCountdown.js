import { useState, useEffect } from "react";

export default function useCountdown() {
  const [secondLeft, setSecondLeft] = useState(0);

  useEffect(() => {
    if (secondLeft <= 0) return;
    const timeout = setTimeout(() => {
      setSecondLeft((prev) => {
        return prev - 1;
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [secondLeft]);

  function start(seconds) {
    setSecondLeft(seconds);
  }

  return { secondLeft, start };
}
