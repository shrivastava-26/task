import React, { useEffect, useMemo, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { type Task, useTasks } from "../TaskContext";



const generateFourDigitId = () => {
  const existingIds = new Set(
    JSON.parse(localStorage.getItem("task_pocket_v1") || "[]")
      .map((t: any) => Number(t.id))
  );

  let newId: number;

  do {
    newId = Math.floor(1000 + Math.random() * 9000); // ✅ 1000–9999 only
  } while (existingIds.has(newId));

  return String(newId);
};


export default function TaskForm({
  editing,
  onCancelEdit,
}: {
  editing: Task | null;
  onCancelEdit: () => void;
}) {
  const { dispatch } = useTasks();
  const [title, setTitle] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setTitle(editing?.title ?? "");
    setTouched(false);
  }, [editing]);

  const error = useMemo(() => {
    const v = title.trim();
    if (!touched) return "";
    if (!v) return "Title is required";
    if (v.length < 3) return "At least 3 characters needed";
    return "";
  }, [title, touched]);

  const submit = () => {
    setTouched(true);
    const v = title.trim();
    if (!v || v.length < 3) return;

    if (editing) {
      dispatch({ type: "UPDATE", payload: { ...editing, title: v } });
      onCancelEdit();
    } else {
      dispatch({
  type: "ADD",
  payload: {
    id: generateFourDigitId(),   // ✅ only 4 digit id
    title: v,
    completed: false,
  },
});
      setTitle("");
      setTouched(false);
    }
  };

  return (
    <Stack spacing={1.2}>
      <TextField
        label={editing ? "Edit title" : "New task title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={() => setTouched(true)}
        error={Boolean(error)}
        helperText={error || " "}
        size="small"
        fullWidth
      />

      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={submit} fullWidth>
          {editing ? "Update" : "Add"}
        </Button>

        {editing && (
          <Button variant="outlined" onClick={onCancelEdit} fullWidth>
            Cancel
          </Button>
        )}
      </Stack>
    </Stack>
  );
}