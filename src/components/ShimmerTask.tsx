import { Skeleton, Stack, Paper } from "@mui/material";

export default function ShimmerTask() {
  return (
    <Stack spacing={1.2}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Paper key={i} sx={{ p: 1.5, borderRadius: 3 }}>
          <Skeleton height={20} width="80%" />
          <Skeleton height={15} width="40%" />
        </Paper>
      ))}
    </Stack>
  );
}