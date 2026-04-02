import React from "react";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { type Task } from "../TaskContext";
import { useNavigate } from "react-router-dom";

function TaskItemBase({
  task,
  onToggle,
  onDelete,
  onEdit,
}: {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}) {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        p: 1.5,
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <IconButton onClick={() => onToggle(task.id)} size="small">
        {task.completed ? (
          <CheckCircleRoundedIcon color="success" fontSize="small" />
        ) : (
          <RadioButtonUncheckedRoundedIcon fontSize="small" />
        )}
      </IconButton>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          onClick={() => navigate(`/task/${task.id}`)}
          sx={{
            fontWeight: 800,
            cursor: "pointer",
            textDecoration: task.completed ? "line-through" : "none",
            opacity: task.completed ? 0.65 : 1,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          title="Open details"
        >
          {task.title}
        </Typography>
        <Typography sx={{ fontSize: 12, opacity: 0.6 }}>#{task.id}</Typography>
      </Box>

      <IconButton onClick={() => onEdit(task)} size="small">
        <EditRoundedIcon fontSize="small" />
      </IconButton>

      <IconButton onClick={() => onDelete(task.id)} size="small" color="error">
        <DeleteRoundedIcon fontSize="small" />
      </IconButton>
    </Paper>
  );
}

const TaskItem = React.memo(TaskItemBase);
export default TaskItem;