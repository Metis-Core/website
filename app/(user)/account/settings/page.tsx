import { Box, Paper, Typography } from '@mui/material';
import PasswordForm from './_components/password-form';

export const metadata = { title: 'Settings · Metis Analytica' };

export default function AccountSettingsPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
          Security and account preferences.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #eee' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#000', mb: 2 }}>
          Change password
        </Typography>
        <PasswordForm />
      </Paper>
    </Box>
  );
}
