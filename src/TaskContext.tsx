import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type State = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "LOAD_START" }
  | { type: "LOAD_SUCCESS"; payload: Task[] }
  | { type: "LOAD_ERROR"; payload: string }
  | { type: "ADD"; payload: Task }
  | { type: "UPDATE"; payload: Task }
  | { type: "DELETE"; payload: string }
  | { type: "TOGGLE"; payload: string };

const KEY = "task_pocket_v1";

const initialState: State = {
  tasks: [],
  loading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD_START":
      return { ...state, loading: true, error: null };
    case "LOAD_SUCCESS":
      return { ...state, loading: false, tasks: action.payload };
    case "LOAD_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ADD":
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case "UPDATE":
      return { ...state, tasks: state.tasks.map(t => (t.id === action.payload.id ? action.payload : t)) };
    case "DELETE":
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };
    case "TOGGLE":
      return {
        ...state,
        tasks: state.tasks.map(t => (t.id === action.payload ? { ...t, completed: !t.completed } : t)),
      };
    default:
      return state;
  }
}

const TaskContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 1) initial load: localStorage -> API fallback
  useEffect(() => {
    let alive = true;

    (async () => {
      dispatch({ type: "LOAD_START" });

      // localStorage first
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) {
          const stored = JSON.parse(raw) as Task[];
          if (stored?.length) {
            dispatch({ type: "LOAD_SUCCESS", payload: stored });
            return;
          }
        }
      } catch {
        // ignore parse errors
      }

      // fallback to API
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=20");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = (await res.json()) as Array<{ id: number; title: string; completed: boolean }>;

        const tasks: Task[] = data.map(d => ({
          id: String(d.id),
          title: d.title,
          completed: Boolean(d.completed),
        }));

        if (!alive) return;
        dispatch({ type: "LOAD_SUCCESS", payload: tasks });
      } catch (e) {
        if (!alive) return;
        dispatch({ type: "LOAD_ERROR", payload: (e as Error).message || "Something went wrong" });
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  // 2) persist tasks
  useEffect(() => {
    if (state.loading) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state.tasks));
    } catch {
      // ignore storage issues
    }
  }, [state.tasks, state.loading]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used inside TaskProvider");
  return ctx;
}