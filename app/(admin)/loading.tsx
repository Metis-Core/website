import { Box, Grid, Paper, Skeleton } from '@mui/material';

export default function AdminLoading() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Skeleton variant="rounded" width={220} height={36} />
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, i) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={i}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="30%" height={40} />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
