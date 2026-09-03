import { Box, Paper, Skeleton } from '@mui/material';

export default function AccountLoading() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Skeleton variant="rounded" width={220} height={40} />
      <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={48} />
        <Skeleton variant="rounded" height={120} />
        <Skeleton variant="rounded" width={140} height={40} />
      </Paper>
    </Box>
  );
}
