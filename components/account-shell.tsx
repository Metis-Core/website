'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  AccountCircleOutlined,
  SettingsOutlined,
  RateReviewOutlined,
  EventNoteOutlined,
  WorkOutlineOutlined,
  DashboardOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  ArrowBackOutlined,
} from '@mui/icons-material';
import { logoutAction } from '@/app/actions/auth';

const SIDEBAR_WIDTH = 260;

const NAV = [
  { href: '/account', label: 'Profile', icon: <AccountCircleOutlined /> },
  { href: '/account/settings', label: 'Settings', icon: <SettingsOutlined /> },
  { href: '/account/consultations', label: 'My consultations', icon: <EventNoteOutlined /> },
  { href: '/account/feedback', label: 'My feedback', icon: <RateReviewOutlined /> },
  { href: '/account/applications', label: 'My applications', icon: <WorkOutlineOutlined /> },
] as const;

export interface AccountShellUser {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
}

function initialsOf(name: string | null, email: string): string {
  const source = (name ?? email).trim();
  if (!source) return '?';
  return (
    source
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? '')
      .join('') || source[0].toUpperCase()
  );
}

function currentLabel(pathname: string): string {
  const exact = NAV.find((n) => n.href === pathname);
  if (exact) return exact.label;
  const nested = NAV.slice(1).find((n) => pathname.startsWith(n.href));
  return nested?.label ?? 'Account';
}

function SidebarContents({
  user,
  onNavigate,
  onClose,
}: {
  user: AccountShellUser;
  onNavigate?: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const initials = initialsOf(user.fullName, user.email);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#ffffff' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 2,
          borderBottom: '1px solid #eee',
        }}
      >
        <Link href="/" onClick={onNavigate} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box sx={{ position: 'relative', width: 150, height: 32 }}>
            <Image
              src="/assets/PNG/LOGO%20DARK%20GREY.png"
              alt="Metis Analytica"
              fill
              sizes="150px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </Box>
        </Link>
        {onClose && (
          <IconButton onClick={onClose} sx={{ display: { md: 'none' } }} size="small">
            <CloseOutlined />
          </IconButton>
        )}
      </Box>

      <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid #eee' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src={user.avatarUrl ?? undefined}
            sx={{ width: 40, height: 40, bgcolor: '#111', color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}
          >
            {initials}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#111' }} noWrap>
              {user.fullName ?? user.email}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }} noWrap component="div">
              {user.email}
            </Typography>
          </Box>
        </Box>
      </Box>

      <List sx={{ flex: 1, p: 1.5, overflowY: 'auto' }}>
        {NAV.map(({ href, label, icon }) => {
          const isActive = href === '/account' ? pathname === '/account' : pathname.startsWith(href);
          return (
            <ListItemButton
              key={href}
              component={Link}
              href={href}
              onClick={onNavigate}
              selected={isActive}
              sx={{
                borderRadius: '10px',
                mb: 0.5,
                px: 1.5,
                py: 1,
                color: isActive ? '#111' : '#555',
                bgcolor: isActive ? '#f5f5f5' : 'transparent',
                '&.Mui-selected': { bgcolor: '#f5f5f5' },
                '&:hover': { bgcolor: '#f9f9f9' },
                '&.Mui-selected:hover': { bgcolor: '#efefef' },
                '& .MuiListItemIcon-root': {
                  color: isActive ? '#111' : '#888',
                  minWidth: 36,
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: isActive ? 700 : 500 }}>
                {label}
              </ListItemText>
            </ListItemButton>
          );
        })}

        {user.isAdmin && (
          <ListItemButton
            component={Link}
            href="/admin"
            onClick={onNavigate}
            sx={{
              mt: 2,
              borderRadius: '10px',
              px: 1.5,
              py: 1,
              color: '#111',
              bgcolor: '#fff7ed',
              border: '1px solid #fed7aa',
              '&:hover': { bgcolor: '#ffedd5' },
              '& .MuiListItemIcon-root': { color: '#c2410c', minWidth: 36 },
            }}
          >
            <ListItemIcon><DashboardOutlined /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 700 }}>
              Admin dashboard
            </ListItemText>
          </ListItemButton>
        )}
      </List>

      <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5, borderTop: '1px solid #eee' }}>
        <ListItemButton
          component={Link}
          href="/"
          onClick={onNavigate}
          sx={{
            borderRadius: '10px',
            color: '#555',
            '&:hover': { bgcolor: '#f9f9f9' },
            '& .MuiListItemIcon-root': { color: '#888', minWidth: 36 },
          }}
        >
          <ListItemIcon><ArrowBackOutlined /></ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>Back to site</ListItemText>
        </ListItemButton>
        <form action={logoutAction}>
          <ListItemButton
            component="button"
            type="submit"
            sx={{
              width: '100%',
              borderRadius: '10px',
              color: '#c62828',
              '&:hover': { bgcolor: '#fef2f2' },
              '& .MuiListItemIcon-root': { color: '#c62828', minWidth: 36 },
            }}
          >
            <ListItemIcon><LogoutOutlined /></ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '0.85rem' }}>Sign out</ListItemText>
          </ListItemButton>
        </form>
      </Box>
    </Box>
  );
}

export default function AccountShell({
  user,
  children,
}: {
  user: AccountShellUser;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = currentLabel(pathname);
  const initials = initialsOf(user.fullName, user.email);

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', bgcolor: '#fafafa' }}>
      {/* Desktop sidebar */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100dvh',
          borderRight: '1px solid #eee',
        }}
      >
        <SidebarContents user={user} />
      </Box>

      {/* Mobile drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: { sx: { width: SIDEBAR_WIDTH, bgcolor: '#fff', border: 'none' } },
        }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <SidebarContents user={user} onNavigate={() => setMobileOpen(false)} onClose={() => setMobileOpen(false)} />
      </Drawer>

      {/* Content column */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: '#fff',
            color: '#111',
            borderBottom: '1px solid #eee',
            top: 0,
          }}
        >
          <Toolbar sx={{ minHeight: { xs: 56, md: 60 }, gap: 1.5, px: { xs: 1.5, md: 3 } }}>
            <IconButton
              edge="start"
              onClick={() => setMobileOpen(true)}
              sx={{ display: { md: 'none' } }}
              aria-label="Open navigation"
            >
              <MenuOutlined />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0, flex: 1 }}>
              <Typography variant="overline" sx={{ color: '#9ca3af', letterSpacing: '0.08em', fontWeight: 700 }}>
                Account ·
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111' }} noWrap>
                {pageTitle}
              </Typography>
            </Box>

            <Tooltip title={user.fullName ?? user.email}>
              <Avatar
                src={user.avatarUrl ?? undefined}
                sx={{ width: 34, height: 34, bgcolor: '#111', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}
              >
                {initials}
              </Avatar>
            </Tooltip>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
            flex: 1,
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
