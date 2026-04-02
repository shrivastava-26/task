import React from "react";
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

import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import TaskDetails from "./pages/TaskDetails";

export default function App({ toggleTheme, mode }: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);

  const bg =
    theme.palette.mode === "light"
      ? "radial-gradient(900px 500px at 10% 0%, rgba(13,110,110,0.14), transparent 60%)," +
        "radial-gradient(700px 500px at 95% 10%, rgba(242,92,84,0.12), transparent 65%)," +
        "linear-gradient(180deg, #FBF7F2 0%, #F6EFE8 100%)"
      : "radial-gradient(900px 500px at 10% 0%, rgba(13,110,110,0.24), transparent 60%)," +
        "radial-gradient(700px 500px at 95% 10%, rgba(242,92,84,0.18), transparent 65%)," +
        "linear-gradient(180deg, #121212 0%, #1E1E1E 100%)";

  const navLinks = (
    <Stack spacing={2} sx={{ p: 2, width: 200 }}>
      <Button
        component={NavLink}
        to="/"
        onClick={() => setOpen(false)}
        sx={{ minWidth: "auto" }}
      >
        Dashboard
      </Button>

      <Button
        component={NavLink}
        to="/about"
        onClick={() => setOpen(false)}
        sx={{ minWidth: "auto" }}
      >
        About
      </Button>
    </Stack>
  );

  return (
    <Box sx={{ minHeight: "100vh", background: bg }}>
      {/* NAVBAR */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.paper,
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 1, sm: 2 },
            minHeight: { xs: 56, sm: 64 },
          }}
        >
          {isMobile && (
            <IconButton size="small" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            noWrap
            sx={{
              flexGrow: 1,
              fontWeight: 900,
              fontSize: { xs: 16, sm: 20 },
              color: (theme) => theme.palette.text.primary,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Task Manager
          </Typography>

          {!isMobile && (
            <>
              <Button
                component={NavLink}
                to="/"
                sx={{ minWidth: "auto", px: 1 }}
              >
                Dashboard
              </Button>

              <Button
                component={NavLink}
                to="/about"
                sx={{ minWidth: "auto", px: 1 }}
              >
                About
              </Button>
            </>
          )}

          <IconButton
            size="small"
            onClick={toggleTheme}
            sx={{ ml: 0.5 }}
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* MOBILE MENU */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        anchor="left"
      >
        {navLinks}
      </Drawer>

      {/* MAIN CONTENT */}
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          px: { xs: 1.5, sm: 2 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Container>
    </Box>
  );
}