import {} from "@mui/icons-material";
import React, { useEffect, useState } from "react";

function ModeSwitcher() {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const onThemeChange = () => setMode(mode === "light" ? "dark" : "light");

  useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <div className="mode-switcher">
      <div className="mode-switcher-container" onClick={onThemeChange}>
        <input
          type="checkbox"
          className="mode-switcher-button"
          defaultChecked={mode === "light" ? false : true}
        />
        <span className="mode-switcher-cover"></span>
        <span className="mode-switcher-slider"></span>
      </div>
      <div>
        <span className="sun"></span>
        <span className="moon"></span>
      </div>
    </div>
  );
}

export default ModeSwitcher;
