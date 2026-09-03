import { Box, Paper, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import type { ContactMessage } from '@/lib/supabase/types';
import MessageStatusSelect from './_components/message-status-select';
import DeleteMessageButton from './_components/delete-message-button';

export const metadata = { title: 'Contact messages · Admin' };

export default async function AdminMessagesPage() {
  await requireAdmin();
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
  const items = (data ?? []) as ContactMessage[];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          Contact messages
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
          {items.length} total message{items.length === 1 ? '' : 's'}.
        </Typography>
      </Box>

      {items.length === 0 ? (
        <Paper elevation={0} sx={{ p: 6, borderRadius: '16px', border: '1px dashed #ddd', textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: '#666' }}>No messages yet.</Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {items.map((m) => (
            <Paper key={m.id} elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid #eee' }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <Box sx={{ flex: 1, minWidth: 240 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {m.subject}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    From <strong>{m.name}</strong> · {m.email}
                    {m.phone && ` · ${m.phone}`}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#999', display: 'block' }}>
                    {new Date(m.created_at).toLocaleString()}
                  </Typography>
                </Box>
                <MessageStatusSelect id={m.id} value={m.status} />
                <DeleteMessageButton id={m.id} />
              </Box>
              <Typography variant="body2" sx={{ color: '#333', lineHeight: 1.6, whiteSpace: 'pre-wrap', mt: 1.5 }}>
                {m.message}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
