import { Box, Paper, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import type { Profile } from '@/lib/supabase/types';
import UserRoleSelect from './_components/user-role-select';
import DeleteUserButton from './_components/delete-user-button';

export const metadata = { title: 'Users · Admin' };

export default async function AdminUsersPage() {
  const { userId: myId } = await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
  const items = (data ?? []) as Profile[];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          Users
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
          {items.length} registered user{items.length === 1 ? '' : 's'}. You can promote a user to admin or demote back.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
        {items.map((p, i) => (
          <Box
            key={p.id}
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr auto', md: '1.5fr 2fr 1fr auto' },
              gap: 2,
              alignItems: 'center',
              px: 3,
              py: 2,
              borderTop: i === 0 ? 'none' : '1px solid #f0f0f0',
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
                {p.full_name ?? '—'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#666' }} noWrap component="div">
                {p.email}
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: '#666', display: { xs: 'none', md: 'block' } }} noWrap>
              {p.organization ?? '—'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#999', display: { xs: 'none', md: 'block' } }}>
              {new Date(p.created_at).toLocaleDateString()}
            </Typography>
            <UserRoleSelect userId={p.id} value={p.role} disabled={p.id === myId} />
            <DeleteUserButton id={p.id} disabled={p.id === myId} />
          </Box>
        ))}
      </Paper>
    </Box>
  );
}
