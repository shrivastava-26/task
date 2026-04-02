import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { AppBar, Box, Container, Toolbar, Typography, Button } from "@mui/material";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import TaskDetails from "./pages/TaskDetails";

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(900px 500px at 10% 0%, rgba(13,110,110,0.14), transparent 60%)," +
          "radial-gradient(700px 500px at 95% 10%, rgba(242,92,84,0.12), transparent 65%)," +
          "linear-gradient(180deg, #FBF7F2 0%, #F6EFE8 100%)",
      }}
    >
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: "rgba(251,247,242,0.8)", backdropFilter: "blur(10px)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flex: 1, fontWeight: 850,color:"black" }}>
            Task Manager
            <Box component="span" sx={{ ml: 1, fontSize: 12, opacity: 0.65 }}>
              (simple & focused)
            </Box>
          </Typography>

          <Button component={NavLink} to="/" sx={{ mr: 1 }}>
            Dashboard
          </Button>
          <Button component={NavLink} to="/about">
            About
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Container>
    </Box>
  );
}