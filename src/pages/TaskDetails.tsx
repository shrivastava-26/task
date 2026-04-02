import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useTasks } from "../TaskContext";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state } = useTasks();

  const task = useMemo(() => state.tasks.find(t => t.id === id) ?? null, [state.tasks, id]);

  return (
    <Paper sx={{ p: 3, borderRadius: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          Task Details
        </Typography>

        {!task ? (
          <Typography sx={{ opacity: 0.7 }}>Task not found.</Typography>
        ) : (
          <>
            <Typography sx={{ fontSize: 18, fontWeight: 850 }}>{task.title}</Typography>
            <Typography sx={{ opacity: 0.7 }}>
              Status: <b>{task.completed ? "Completed" : "Pending"}</b>
            </Typography>
            <Typography sx={{ opacity: 0.55, fontSize: 13 }}>ID: {task.id}</Typography>
          </>
        )}

        <Button variant="outlined" onClick={() => navigate("/")}>
          Back
        </Button>
      </Stack>
    </Paper>
  );
}