import { createTheme, type PaletteMode } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#0D6E6E" },
      secondary: { main: "#F25C54" },
      background:
        mode === "light"
          ? { default: "#FBF7F2", paper: "#FFFFFF" }
          : { default: "#121212", paper: "#1E1E1E" },
    },
    shape: { borderRadius: 14 },
    typography: {
  fontFamily: "'Poppins', sans-serif",
  button: {
    textTransform: "none",
    fontWeight: 600,
  },
},
  });