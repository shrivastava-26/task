import React from "react";
import { Paper, Stack, Typography } from "@mui/material";

export default function About() {
  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Stack spacing={1}>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>About</Typography>
        <Typography sx={{ opacity: 0.75 }}>
          This app demonstrates React fundamentals: CRUD, routing, API fetch, context state,
          derived filtering/search, form validation, localStorage persistence, and basic performance optimizations.
        </Typography>
      </Stack>
    </Paper>
  );
}