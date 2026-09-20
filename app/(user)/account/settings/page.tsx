import { Box, Paper, Typography } from '@mui/material';
import PasswordForm from './_components/password-form';

export const metadata = { title: 'Settings · Metis Analytica' };

export default function AccountSettingsPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Security and account preferences.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Change password
        </Typography>
        <PasswordForm />
      </Paper>
    </Box>
  );
}
