'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import {
  AccountCircleOutlined,
  SettingsOutlined,
  RateReviewOutlined,
  EventNoteOutlined,
  WorkOutlineOutlined,
  DashboardOutlined,
} from '@mui/icons-material';
import type { ReactNode } from 'react';

const NAV = [
  { href: '/account', label: 'Profile', icon: <AccountCircleOutlined /> },
  { href: '/account/settings', label: 'Settings', icon: <SettingsOutlined /> },
  { href: '/account/consultations', label: 'My consultations', icon: <EventNoteOutlined /> },
  { href: '/account/feedback', label: 'My feedback', icon: <RateReviewOutlined /> },
  { href: '/account/applications', label: 'My applications', icon: <WorkOutlineOutlined /> },
] as const;

export default function AccountSidebar({ isAdmin, children }: { isAdmin: boolean; children: ReactNode }) {
  const pathname = usePathname();

  const item = (href: string, label: string, icon: ReactNode, isActive: boolean) => (
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
      <ListItemText primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive ? 700 : 500 }}>{label}</ListItemText>
    </ListItemButton>
  );

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
          Account
        </Typography>
        <List sx={{ mt: 1 }}>
          {NAV.map((n) => item(n.href, n.label, n.icon, pathname === n.href))}
        </List>
        {isAdmin && (
          <>
            <Typography variant="overline" sx={{ px: 1, color: '#999', fontWeight: 700, letterSpacing: '0.08em' }}>
              Admin
            </Typography>
            <List sx={{ mt: 1 }}>
              {item('/admin', 'Dashboard', <DashboardOutlined />, pathname === '/admin')}
            </List>
          </>
        )}
      </Paper>

      <Box sx={{ minWidth: 0 }}>{children}</Box>
    </Box>
  );
}
