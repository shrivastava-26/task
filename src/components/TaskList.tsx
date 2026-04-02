import React from "react";
import { Stack, Typography } from "@mui/material";
import { type Task } from "../TaskContext";
import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}) {
  if (!tasks.length) {
    return <Typography sx={{ opacity: 0.7 }}>No tasks in this view.</Typography>;
  }

  return (
    <Stack spacing={1.2}>
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </Stack>
  );
}