'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import {
  DashboardOutlined,
  BuildOutlined,
  Inventory2Outlined,
  RateReviewOutlined,
  EventNoteOutlined,
  WorkOutlineOutlined,
  AssignmentIndOutlined,
  MailOutline,
  ManageAccountsOutlined,
} from '@mui/icons-material';
import type { ReactNode } from 'react';

const NAV = [
  { href: '/admin', label: 'Overview', icon: <DashboardOutlined /> },
  { href: '/admin/services', label: 'Services', icon: <BuildOutlined /> },
  { href: '/admin/products', label: 'Products', icon: <Inventory2Outlined /> },
  { href: '/admin/consultations', label: 'Consultations', icon: <EventNoteOutlined /> },
  { href: '/admin/feedback', label: 'Feedback', icon: <RateReviewOutlined /> },
  { href: '/admin/careers', label: 'Careers', icon: <WorkOutlineOutlined /> },
  { href: '/admin/applications', label: 'Applications', icon: <AssignmentIndOutlined /> },
  { href: '/admin/messages', label: 'Contact messages', icon: <MailOutline /> },
  { href: '/admin/users', label: 'Users', icon: <ManageAccountsOutlined /> },
] as const;

export default function AdminSidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '260px 1fr' }, gap: 3 }}>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: '16px',
          border: '1px solid #eee',
          height: 'fit-content',
          position: { md: 'sticky' },
          top: { md: 100 },
        }}
      >
        <Typography variant="overline" sx={{ px: 1, color: '#999', fontWeight: 700, letterSpacing: '0.08em' }}>
          Admin
        </Typography>
        <List sx={{ mt: 1 }}>
          {NAV.map(({ href, label, icon }) => {
            const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
            return (
              <ListItemButton
                key={href}
                component={Link}
                href={href}
                selected={isActive}
                sx={{
                  borderRadius: '10px',
                  mb: 0.5,
                  color: isActive ? '#000' : '#555',
                  backgroundColor: isActive ? '#f0f0f0' : 'transparent',
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  '& .MuiListItemIcon-root': { color: isActive ? '#000' : '#666', minWidth: 40 },
                }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive ? 700 : 500 }}>
                  {label}
                </ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </Paper>

      <Box sx={{ minWidth: 0 }}>{children}</Box>
    </Box>
  );
}
