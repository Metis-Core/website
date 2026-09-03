'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
} from '@mui/material';
import {
  AccountCircleOutlined,
  DashboardOutlined,
  LogoutOutlined,
  SettingsOutlined,
  RateReviewOutlined,
  EventNoteOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { logoutAction } from '@/app/actions/auth';

export type AccountMenuUser = {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  role: 'admin' | 'user';
};

function initialsOf(name: string | null, email: string): string {
  const source = (name ?? email).trim();
  if (!source) return '?';
  const parts = source.split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || source[0].toUpperCase();
}

export default function AccountMenu({ user }: { user: AccountMenuUser }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const initials = initialsOf(user.fullName, user.email);
  const displayName = user.fullName ?? user.email;

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        aria-label="Open account menu"
        sx={{ p: 0.5 }}
      >
        <Avatar
          src={user.avatarUrl ?? undefined}
          alt={displayName}
          sx={{ width: 36, height: 36, bgcolor: '#737373', color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}
        >
          {initials}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 240,
              borderRadius: '12px',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#000' }} noWrap>
            {displayName}
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }} noWrap component="div">
            {user.email}
          </Typography>
          {user.role === 'admin' && (
            <Chip label="Admin" size="small" sx={{ mt: 0.75, bgcolor: '#000', color: '#fff', fontWeight: 700, fontSize: '0.7rem' }} />
          )}
        </Box>
        <Divider />

        <MenuItem component={Link} href="/account" onClick={() => setAnchorEl(null)}>
          <ListItemIcon><AccountCircleOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>My profile</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/account/settings" onClick={() => setAnchorEl(null)}>
          <ListItemIcon><SettingsOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/account/consultations" onClick={() => setAnchorEl(null)}>
          <ListItemIcon><EventNoteOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>My consultations</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/account/feedback" onClick={() => setAnchorEl(null)}>
          <ListItemIcon><RateReviewOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>My feedback</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href="/account/applications" onClick={() => setAnchorEl(null)}>
          <ListItemIcon><WorkOutlineOutlined fontSize="small" /></ListItemIcon>
          <ListItemText>My applications</ListItemText>
        </MenuItem>

        {user.role === 'admin' && [
          <Divider key="d" />,
          <MenuItem key="admin" component={Link} href="/admin" onClick={() => setAnchorEl(null)}>
            <ListItemIcon><DashboardOutlined fontSize="small" /></ListItemIcon>
            <ListItemText>Admin dashboard</ListItemText>
          </MenuItem>,
        ]}

        <Divider />
        <form action={logoutAction}>
          <MenuItem component="button" type="submit" sx={{ width: '100%' }}>
            <ListItemIcon><LogoutOutlined fontSize="small" /></ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </MenuItem>
        </form>
      </Menu>
    </>
  );
}
