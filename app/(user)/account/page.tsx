import { Box, Chip, Paper, Typography } from '@mui/material';
import { requireUser } from '@/lib/supabase/queries';
import ProfileForm from './_components/profile-form';

export const metadata = { title: 'My profile · Metis Analytica' };

export default async function AccountPage() {
  const { profile } = await requireUser();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          My profile
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
          Keep your details up to date so we can reach you about consultations and applications.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Typography variant="overline" sx={{ color: '#999', fontWeight: 700, letterSpacing: '0.08em' }}>
            Role
          </Typography>
          <Chip
            label={profile.role === 'admin' ? 'Admin' : 'Member'}
            size="small"
            sx={{
              bgcolor: profile.role === 'admin' ? '#000' : '#e0e0e0',
              color: profile.role === 'admin' ? '#fff' : '#000',
              fontWeight: 700,
            }}
          />
        </Box>
        <ProfileForm profile={profile} />
      </Paper>
    </Box>
  );
}
