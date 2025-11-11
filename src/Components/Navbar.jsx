import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#222",
        color: theme === "light" ? "#000" : "#fff",
      }}
    >
      <h1>{theme} MODE</h1>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
    </div>
  );
}

export default Navbar;
