import { Routes, Route, NavLink } from "react-router-dom";

import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import React from "react";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import TaskDetails from "./pages/TaskDetails";




export default function App({ toggleTheme, mode }: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);


  const background =
    theme.palette.mode === "light"
      ? "radial-gradient(900px 500px at 10% 0%, rgba(13,110,110,0.14), transparent 60%)," +
        "radial-gradient(700px 500px at 95% 10%, rgba(242,92,84,0.12), transparent 65%)," +
        "linear-gradient(180deg, #FBF7F2 0%, #F6EFE8 100%)"
      : "radial-gradient(900px 500px at 10% 0%, rgba(13,110,110,0.24), transparent 60%)," +
        "radial-gradient(700px 500px at 95% 10%, rgba(242,92,84,0.18), transparent 65%)," +
        "linear-gradient(180deg, #121212 0%, #1E1E1E 100%)";

  const navLinks = (
    <Stack spacing={2} sx={{ p: 2, width: 200 }}>
      <Button component={NavLink} to="/" onClick={() => setOpen(false)}>
        Dashboard
      </Button>
      <Button component={NavLink} to="/about" onClick={() => setOpen(false)}>
        About
      </Button>
    </Stack>
  );

  return (
    <Box sx={{ minHeight: "100vh", background }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.paper,
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography
  sx={{
    flex: 1,
    fontWeight: 900,
    color: (theme) =>
      theme.palette.mode === "light" ? "#000" : "#fff",
  }}
>
  Task Manager
</Typography>
          {!isMobile && (
            <>
              <Button component={NavLink} to="/">
                Dashboard
              </Button>
              <Button component={NavLink} to="/about">
                About
              </Button>
            </>
          )}

          {/* THEME BUTTON */}
          <IconButton onClick={toggleTheme}>
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        {navLinks}
      </Drawer>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 3 } }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Container>
    </Box>
  );
}