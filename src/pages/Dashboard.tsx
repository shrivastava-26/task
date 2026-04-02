import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Pagination } from "@mui/material";
import { Box, Chip, Paper, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {type Task, useTasks } from "../TaskContext";
import ShimmerTask from "../components/ShimmerTask";

type Filter = "all" | "completed" | "pending";

export default function Dashboard() {
  const [page, setPage] = useState(1);
const rowsPerPage = 8;
const [loadingPage, setLoadingPage] = useState(false);

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

  const totalPages = Math.ceil(visibleTasks.length / rowsPerPage);

const paginatedTasks = useMemo(() => {
  const start = (page - 1) * rowsPerPage;
  return visibleTasks.slice(start, start + rowsPerPage);
}, [visibleTasks, page]);


const handlePageChange = (_: any, value: number) => {
  setLoadingPage(true);

  setTimeout(() => {
    setPage(value);
    setLoadingPage(false);

    const el = document.getElementById("taskScroll");
    el?.scrollTo({ top: 0 });
  }, 400);
};
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
    height: "calc(100vh - 80px)",   // ✅ remove navbar height
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "320px minmax(0,1fr)",
    },
    gap: 2,
    overflow: "hidden",
  }}
>
      {/* LEFT: controls */}
      <Paper
  sx={{
    p: 2,
    borderRadius: 1,
    width: "100%",
    minWidth: 0,
    height: "fit-content",
    position: { md: "sticky" },
    top: { md: 0 },
    alignSelf: "start",
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
  id="taskScroll"
  sx={{
    p: 2,
    borderRadius: 1,
    width: "100%",
    minWidth: 0,
    height: "100%",
    overflowY: "auto",
  }}
>
  <Typography variant="h5" sx={{ mb: 1 }}>
    Task Shelf
  </Typography>

  <Typography sx={{ opacity: 0.7, fontSize: 13, mb: 2 }}>
    Small steps. Clear titles. Click a task for details.
  </Typography>

  {loadingPage ? (
    <ShimmerTask />
  ) : (
    <TaskList
      tasks={paginatedTasks}
      onToggle={onToggle}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  )}

  <Box
    sx={{
      mt: 2,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Pagination
      count={totalPages}
      page={page}
      onChange={handlePageChange}
      color="primary"
      shape="rounded"
    />
  </Box>
</Paper>
    </Box>
  );
}