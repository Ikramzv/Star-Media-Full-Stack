import React, { useEffect, useRef, useState } from "react";

function InteractiveLi({ children }) {
  const [active, setActive] = useState(false);
  const li = useRef();
  useEffect(() => {
    const filter = Array.from(document.querySelectorAll(".chatList")).filter(
      (li) => li.classList.contains("active")
    );

    if (filter.length > 1) {
      filter
        .filter((list) => list !== li.current)
        .forEach((list) => list.classList.remove("active"));
    }
  }, [active]);
  return (
    <li
      className={`chatList`}
      ref={li}
      onClick={() => {
        li.current.classList.add("active");
        setActive(!active);
      }}
    >
      {children}
    </li>
  );
}

export default React.memo(InteractiveLi);
