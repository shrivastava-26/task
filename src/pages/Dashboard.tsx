import React, { useCallback, useMemo, useState } from "react";
import { Box, Chip, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {type Task, useTasks } from "../TaskContext";

type Filter = "all" | "completed" | "pending";

export default function Dashboard() {
  const { state, dispatch } = useTasks();

  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Task | null>(null);

  const onEdit = useCallback((task: Task) => setEditing(task), []);
  const onCancelEdit = useCallback(() => setEditing(null), []);

  const onToggle = useCallback((id: string) => dispatch({ type: "TOGGLE", payload: id }), [dispatch]);
  const onDelete = useCallback((id: string) => dispatch({ type: "DELETE", payload: id }), [dispatch]);

  const visibleTasks = useMemo(() => {
    const q = search.trim().toLowerCase();

    return state.tasks
      .filter(t => {
        if (filter === "completed") return t.completed;
        if (filter === "pending") return !t.completed;
        return true;
      })
      .filter(t => (q ? t.title.toLowerCase().includes(q) : true));
  }, [state.tasks, filter, search]);

  const stats = useMemo(() => {
    const done = state.tasks.filter(t => t.completed).length;
    return { total: state.tasks.length, done, open: state.tasks.length - done };
  }, [state.tasks]);

  if (state.loading) {
    return (
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Typography sx={{ opacity: 0.7 }}>Loading your tasks…</Typography>
      </Paper>
    );
  }

  if (state.error) {
    return (
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Typography color="error" sx={{ fontWeight: 800 }}>
          {state.error}
        </Typography>
        <Typography sx={{ opacity: 0.7, mt: 1 }}>
          Tip: refresh once. JSONPlaceholder sometimes rate-limits.
        </Typography>
      </Paper>
    );
  }

  return (
   <Box
  sx={{
    width: "100%",
    maxWidth: "100%",
    display: "grid",
    gridTemplateColumns: {
      xs: "minmax(0,1fr)",          // 👈 THIS STOPS OVERFLOW
      md: "320px minmax(0,1fr)",
    },
    gap: 2,
    alignItems: "start",
  }}
>
      {/* LEFT: controls */}
      <Paper
  sx={{
    p: 2,
    borderRadius: 4,
    width: "100%",
    minWidth: 0,                 // ✅ IMPORTANT
    overflow: "hidden",
    position: { xs: "static", md: "sticky" },
    top: { md: 88 },
  }}
>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5">Control Deck</Typography>
            <Typography sx={{ opacity: 0.7, fontSize: 13 }}>
              Add tasks + slice your view.
            </Typography>
          </Box>

          <TaskForm editing={editing} onCancelEdit={onCancelEdit} />

          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            placeholder="Search titles…"
            fullWidth
          />

          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, v) => v && setFilter(v)}
            fullWidth
            sx={{ "& .MuiToggleButton-root": { borderRadius: 3, py: 1 } }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="pending">Open</ToggleButton>
            <ToggleButton value="completed">Done</ToggleButton>
          </ToggleButtonGroup>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Chip label={`Total: ${stats.total}`} />
            <Chip color="success" label={`Done: ${stats.done}`} />
            <Chip color="warning" label={`Open: ${stats.open}`} />
          </Stack>
        </Stack>
      </Paper>

      {/* RIGHT: list */}
      <Paper
  sx={{
    p: 2,
    borderRadius: 4,
    width: "100%",
    minWidth: 0,            // ✅ IMPORTANT
    overflow: "hidden",
  }}
>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Task Shelf
        </Typography>
        <Typography sx={{ opacity: 0.7, fontSize: 13, mb: 2 }}>
          Small steps. Clear titles. Click a task for details.
        </Typography>

        <TaskList
          tasks={visibleTasks}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </Paper>
    </Box>
  );
}