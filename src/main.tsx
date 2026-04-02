import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App";
import { TaskProvider } from "./TaskContext";
import { getDesignTokens } from "./theme";
import './index.css'
function Root() {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("themeMode") as "light" | "dark") || "light"
  );

  const theme = useMemo(() => getDesignTokens(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaskProvider>
        <BrowserRouter>
          <App toggleTheme={toggleTheme} mode={mode} />
        </BrowserRouter>
      </TaskProvider>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);