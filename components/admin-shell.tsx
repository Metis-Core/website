'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Divider,
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
  DashboardOutlined,
  BuildOutlined,
  Inventory2Outlined,
  RateReviewOutlined,
  EventNoteOutlined,
  WorkOutlineOutlined,
  AssignmentIndOutlined,
  MailOutline,
  ManageAccountsOutlined,
  MenuOutlined,
  CloseOutlined,
  LogoutOutlined,
  ArrowBackOutlined,
} from '@mui/icons-material';
import { logoutAction } from '@/app/actions/auth';

const SIDEBAR_WIDTH = 260;

const NAV = [
  { href: '/admin', label: 'Overview', icon: <DashboardOutlined /> },
  { href: '/admin/services', label: 'Services', icon: <BuildOutlined /> },
  { href: '/admin/products', label: 'Products', icon: <Inventory2Outlined /> },
  { href: '/admin/consultations', label: 'Consultations', icon: <EventNoteOutlined /> },
  { href: '/admin/feedback', label: 'Feedback', icon: <RateReviewOutlined /> },
  { href: '/admin/careers', label: 'Careers', icon: <WorkOutlineOutlined /> },
  { href: '/admin/applications', label: 'Applications', icon: <AssignmentIndOutlined /> },
  { href: '/admin/messages', label: 'Messages', icon: <MailOutline /> },
  { href: '/admin/users', label: 'Users', icon: <ManageAccountsOutlined /> },
] as const;

export interface AdminShellUser {
  email: string;
  fullName: string | null;
  avatarUrl: string | null;
}

function initialsOf(name: string | null, email: string): string {
  const source = (name ?? email).trim();
  if (!source) return '?';
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || source[0].toUpperCase();
}

function currentLabel(pathname: string): string {
  const exact = NAV.find((n) => n.href === pathname);
  if (exact) return exact.label;
  const nested = NAV.slice(1).find((n) => pathname.startsWith(n.href));
  return nested?.label ?? 'Admin';
}

function SidebarContents({
  user,
  onNavigate,
  onClose,
}: {
  user: AdminShellUser;
  onNavigate?: () => void;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const initials = initialsOf(user.fullName, user.email);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#0b0b0d', color: '#e5e7eb' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2, borderBottom: '1px solid #1f1f22' }}>
        <Link href="/admin" onClick={onNavigate} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box sx={{ position: 'relative', width: 150, height: 32 }}>
            <Image
              src="/assets/PNG/LOGO%20WHITE.png"
              alt="Metis Analytica"
              fill
              sizes="150px"
              style={{ objectFit: 'contain', objectPosition: 'left center' }}
              priority
            />
          </Box>
        </Link>
        {onClose && (
          <IconButton onClick={onClose} sx={{ color: '#fff', display: { md: 'none' } }} size="small">
            <CloseOutlined />
          </IconButton>
        )}
      </Box>

      <Box sx={{ px: 2.5, py: 2, borderBottom: '1px solid #1f1f22' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src={user.avatarUrl ?? undefined}
            sx={{ width: 38, height: 38, bgcolor: '#e5e7eb', color: '#0b0b0d', fontSize: '0.85rem', fontWeight: 700 }}
          >
            {initials}
          </Avatar>
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }} noWrap>
              {user.fullName ?? user.email}
            </Typography>
            <Typography variant="caption" sx={{ color: '#9ca3af' }} noWrap component="div">
              {user.email}
            </Typography>
          </Box>
          <Chip label="Admin" size="small" sx={{ bgcolor: '#fbbf24', color: '#111', fontWeight: 800, fontSize: '0.65rem', height: 20 }} />
        </Box>
      </Box>

      <List sx={{ flex: 1, p: 1.5, overflowY: 'auto' }}>
        {NAV.map(({ href, label, icon }) => {
          const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
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
                color: isActive ? '#fff' : '#c7c8cc',
                bgcolor: isActive ? '#1f2024' : 'transparent',
                '&.Mui-selected': { bgcolor: '#1f2024' },
                '&:hover': { bgcolor: '#17181b' },
                '&.Mui-selected:hover': { bgcolor: '#1f2024' },
                '& .MuiListItemIcon-root': {
                  color: isActive ? '#fff' : '#9ca3af',
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
      </List>

      <Divider sx={{ borderColor: '#1f1f22' }} />
      <Box sx={{ p: 1.5, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <ListItemButton
          component={Link}
          href="/"
          onClick={onNavigate}
          sx={{
            borderRadius: '10px',
            color: '#c7c8cc',
            '&:hover': { bgcolor: '#17181b' },
            '& .MuiListItemIcon-root': { color: '#9ca3af', minWidth: 36 },
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
              color: '#fca5a5',
              '&:hover': { bgcolor: '#2a1717', color: '#fecaca' },
              '& .MuiListItemIcon-root': { color: '#fca5a5', minWidth: 36 },
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

export default function AdminShell({
  user,
  children,
}: {
  user: AdminShellUser;
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const pageTitle = currentLabel(pathname);
  const initials = initialsOf(user.fullName, user.email);

  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', bgcolor: '#f5f6f8' }}>
      {/* Permanent sidebar on md+ */}
      <Box
        component="aside"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          position: 'sticky',
          top: 0,
          height: '100dvh',
        }}
      >
        <SidebarContents user={user} />
      </Box>

      {/* Temporary drawer on mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: { width: SIDEBAR_WIDTH, bgcolor: '#0b0b0d', color: '#e5e7eb', border: 'none' },
          },
        }}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <SidebarContents user={user} onNavigate={() => setMobileOpen(false)} onClose={() => setMobileOpen(false)} />
      </Drawer>

      {/* Main column */}
      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: '#fff',
            color: '#111',
            borderBottom: '1px solid #e5e7eb',
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
                Admin ·
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

        {/* Content */}
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
