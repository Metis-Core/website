import { Box, Grid, Typography } from '@mui/material';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { requireAdmin } from '@/lib/supabase/queries';
import { LinkPaper } from '@/components/link-wrappers';

export const metadata = { title: 'Admin overview · Metis Analytica' };

async function count(table: string, filter?: { column: string; value: string }) {
  const supabase = await createSupabaseServerClient();
  let q = supabase.from(table).select('id', { count: 'exact', head: true });
  if (filter) q = q.eq(filter.column, filter.value);
  const { count } = await q;
  return count ?? 0;
}

type StatItem = { label: string; value: number; href: string; color: string };

export default async function AdminOverviewPage() {
  await requireAdmin();

  const [
    newConsultations,
    newFeedback,
    newApplications,
    newMessages,
    totalUsers,
    totalServices,
    totalProducts,
    activeCareers,
  ] = await Promise.all([
    count('consultations', { column: 'status', value: 'new' }),
    count('feedback', { column: 'status', value: 'new' }),
    count('job_applications', { column: 'status', value: 'new' }),
    count('contact_messages', { column: 'status', value: 'new' }),
    count('profiles'),
    count('services'),
    count('products'),
    count('career_positions', { column: 'is_active', value: 'true' }),
  ]);

  const inbox: StatItem[] = [
    { label: 'New consultations', value: newConsultations, href: '/admin/consultations', color: '#1976d2' },
    { label: 'New feedback', value: newFeedback, href: '/admin/feedback', color: '#dc004e' },
    { label: 'New applications', value: newApplications, href: '/admin/applications', color: '#00897b' },
    { label: 'New messages', value: newMessages, href: '/admin/messages', color: '#f57c00' },
  ];

  const catalog: StatItem[] = [
    { label: 'Total users', value: totalUsers, href: '/admin/users', color: '#000' },
    { label: 'Services', value: totalServices, href: '/admin/services', color: '#737373' },
    { label: 'Products', value: totalProducts, href: '/admin/products', color: '#dc004e' },
    { label: 'Open roles', value: activeCareers, href: '/admin/careers', color: '#00897b' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: '#000' }}>
          Overview
        </Typography>
        <Typography variant="body2" sx={{ color: '#666', mt: 0.5 }}>
          What&apos;s new since your last visit and the state of the catalog.
        </Typography>
      </Box>

      <Box>
        <Typography variant="overline" sx={{ color: '#999', fontWeight: 700, letterSpacing: '0.08em' }}>
          Inbox
        </Typography>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {inbox.map((s) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={s.href}>
              <StatCard {...s} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant="overline" sx={{ color: '#999', fontWeight: 700, letterSpacing: '0.08em' }}>
          Catalog
        </Typography>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {catalog.map((s) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={s.href}>
              <StatCard {...s} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function StatCard({ label, value, href, color }: StatItem) {
  return (
    <LinkPaper
      href={href}
      elevation={0}
      sx={{
        display: 'block',
        textDecoration: 'none',
        p: 3,
        borderRadius: '12px',
        border: '1px solid #eee',
        borderLeft: `4px solid ${color}`,
        transition: 'all 0.2s ease',
        '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' },
      }}
    >
      <Typography variant="caption" sx={{ color: '#666', fontWeight: 600, letterSpacing: '0.04em' }}>
        {label.toUpperCase()}
      </Typography>
      <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: '#000', mt: 0.5 }}>{value}</Typography>
    </LinkPaper>
  );
}
