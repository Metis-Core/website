'use client';

import { useEffect } from 'react';
import { Alert, Box, Button, Paper, Typography } from '@mui/material';

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Paper elevation={0} sx={{ p: 4, borderRadius: '16px', border: '1px solid #eee' }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        Admin section failed to load.
      </Alert>
      <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
        Digest: <code>{error.digest ?? 'n/a'}</code>
      </Typography>
      <Box>
        <Button variant="contained" onClick={reset}>Retry</Button>
      </Box>
    </Paper>
  );
}
