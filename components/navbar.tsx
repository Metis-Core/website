'use client';

import { FC, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Box,
  Link as MuiLink,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Collapse,
  Divider,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import AccountMenu, { type AccountMenuUser } from '@/components/account-menu';
import CustomButton from '@/components/button';
import { brand } from '@/lib/brand';
import { hasOverlayHero } from '@/lib/nav';

const StyledMenu = styled(Menu)({
  '& .MuiPaper-root': {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    borderRadius: 12,
    marginTop: 8,
    boxShadow: 'var(--shadow-lg)',
  },
});

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Careers', href: '/careers' },
];

const mobileLinks = [
  { label: 'Home', href: '/' },
  ...navLinks,
];

type NavProduct = { label: string; href: string; color: string };

function navLinkSx(isActive: boolean, overHero: boolean) {
  const idle = overHero ? 'rgba(255,255,255,0.86)' : 'text.primary';
  const active = overHero ? '#ffffff' : 'primary.main';
  return {
    color: isActive ? active : idle,
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '0.9rem',
    position: 'relative' as const,
    whiteSpace: 'nowrap' as const,
    py: 1,
    px: 0.75,
    borderRadius: 0,
    bgcolor: 'transparent',
    boxShadow: 'none',
    borderBottom: isActive ? `2px solid ${overHero ? '#ffffff' : brand.accentBlue}` : '2px solid transparent',
    '&:hover': {
      color: overHero ? '#ffffff' : 'primary.main',
    },
  };
}

const Navbar: FC<{
  user?: AccountMenuUser | null;
  products: NavProduct[];
}> = ({ user = null, products }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [anchorElProducts, setAnchorElProducts] = useState<null | HTMLElement>(null);
  const [overHero, setOverHero] = useState(() => hasOverlayHero(pathname));

  useEffect(() => {
    const hero = document.querySelector('[data-nav-hero]');
    if (!hero) {
      setOverHero(false);
      return;
    }

    const update = () => {
      const bottom = hero.getBoundingClientRect().bottom;
      setOverHero(bottom > 64);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  const closeDrawer = () => setMobileOpen(false);
  const isProductActive = pathname.startsWith('/products');
  const logoSrc = overHero ? '/assets/PNG/LOGO%20WHITE.png' : '/assets/PNG/LOGO%20DARK%20GREY.png';

  const drawerItemSx = (isActive: boolean) => ({
    color: isActive ? 'primary.main' : 'text.primary',
    fontSize: '0.95rem',
    fontWeight: 500,
    minHeight: 44,
    bgcolor: isActive ? 'rgba(74, 144, 217, 0.08)' : 'transparent',
    borderLeft: isActive ? `3px solid ${brand.accentBlue}` : '3px solid transparent',
    '&:hover': {
      bgcolor: isActive ? 'rgba(74, 144, 217, 0.08)' : 'var(--surface)',
      color: 'primary.main',
    },
  });

  const drawer = (
    <Box sx={{ p: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 1 }}>
        <Link href="/" onClick={closeDrawer} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', minWidth: 0 }}>
          <Image
            src="/assets/PNG/LOGO%20DARK%20GREY.png"
            alt="Metis Analytica"
            width={160}
            height={44}
            style={{ height: 40, width: 'auto', maxWidth: '70vw', objectFit: 'contain' }}
            priority
          />
        </Link>
        <IconButton onClick={closeDrawer} aria-label="Close menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ flex: 1, overflowY: 'auto' }}>
        {mobileLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <ListItem key={label} disablePadding>
              <ListItemButton component={Link} href={href} onClick={closeDrawer} sx={drawerItemSx(isActive)}>
                {label}
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setMobileProductsOpen((open) => !open)}
            sx={drawerItemSx(isProductActive)}
            aria-expanded={mobileProductsOpen}
          >
            Products
            <ExpandMoreIcon
              sx={{
                ml: 'auto',
                transform: mobileProductsOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s ease',
              }}
            />
          </ListItemButton>
        </ListItem>
        <Collapse in={mobileProductsOpen} timeout="auto">
          <List component="div" disablePadding>
            {products.map(({ label, href }) => (
              <ListItemButton
                key={label}
                component={Link}
                href={href}
                onClick={closeDrawer}
                sx={{ ...drawerItemSx(pathname === href), pl: 4 }}
              >
                {label}
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItem disablePadding>
          <ListItemButton component={Link} href="/contact" onClick={closeDrawer} sx={drawerItemSx(pathname === '/contact')}>
            Contact
          </ListItemButton>
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {user ? (
        <Box sx={{ px: 1, display: 'flex', flexDirection: 'column', gap: 0.5, pb: 2 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.08em' }}>
            Signed in as
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
            {user.fullName ?? user.email}
          </Typography>
          <MuiLink component={Link} href="/account" onClick={closeDrawer} sx={{ color: 'text.primary', textDecoration: 'none', py: 1, minHeight: 44, display: 'flex', alignItems: 'center' }}>
            My profile
          </MuiLink>
          <MuiLink component={Link} href="/account/settings" onClick={closeDrawer} sx={{ color: 'text.primary', textDecoration: 'none', py: 1, minHeight: 44, display: 'flex', alignItems: 'center' }}>
            Settings
          </MuiLink>
          {user.role === 'admin' && (
            <MuiLink component={Link} href="/admin" onClick={closeDrawer} sx={{ color: 'text.primary', textDecoration: 'none', py: 1, minHeight: 44, display: 'flex', alignItems: 'center', fontWeight: 700 }}>
              Admin dashboard
            </MuiLink>
          )}
        </Box>
      ) : (
        <Box sx={{ px: 1, display: 'flex', flexDirection: 'column', gap: 1, pb: 2 }}>
          <CustomButton href="/login" variant="outlined" onClick={closeDrawer} fullWidth>
            Sign in
          </CustomButton>
          <CustomButton href="/register" variant="contained" onClick={closeDrawer} fullWidth>
            Create account
          </CustomButton>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={{
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          backgroundImage: 'none',
          bgcolor: overHero ? 'transparent' : 'rgba(255,255,255,0.92)',
          backdropFilter: overHero ? 'none' : 'blur(16px) saturate(160%)',
          borderBottom: overHero ? '1px solid transparent' : '1px solid var(--border)',
          boxShadow: overHero ? 'none' : 'var(--shadow-sm)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
            px: { xs: 2, sm: 3 },
            minHeight: { xs: 56, sm: 64 },
            gap: 1,
          }}
        >
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', minWidth: 0 }}>
            <Box sx={{ position: 'relative', width: { xs: 148, sm: 188, md: 220 }, height: { xs: 36, sm: 44, md: 52 }, flexShrink: 0 }}>
              <Image
                src={logoSrc}
                alt="Metis Analytica"
                fill
                sizes="(max-width: 600px) 148px, (max-width: 900px) 188px, 220px"
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </Box>
          </Link>

          <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 1.25, alignItems: 'center', ml: 'auto', minWidth: 0 }}>
            {navLinks.map(({ label, href }) => (
              <MuiLink key={label} component={Link} href={href} sx={navLinkSx(pathname === href, overHero)}>
                {label}
              </MuiLink>
            ))}

            <Box
              onClick={(event) => {
                setAnchorElProducts(event.currentTarget);
                setProductsOpen(true);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setAnchorElProducts(event.currentTarget);
                  setProductsOpen(true);
                }
              }}
              role="button"
              tabIndex={0}
              aria-haspopup="menu"
              aria-expanded={productsOpen}
              sx={{ ...navLinkSx(isProductActive, overHero), display: 'flex', alignItems: 'center', gap: 0.25, cursor: 'pointer' }}
            >
              Products
              <ExpandMoreIcon
                sx={{
                  fontSize: '1.1rem',
                  transform: productsOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease',
                }}
              />
            </Box>

            <StyledMenu
              anchorEl={anchorElProducts}
              open={productsOpen}
              onClose={() => {
                setAnchorElProducts(null);
                setProductsOpen(false);
              }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              {products.map(({ label, href, color }) => (
                <MenuItem
                  key={label}
                  component={Link}
                  href={href}
                  onClick={() => {
                    setAnchorElProducts(null);
                    setProductsOpen(false);
                  }}
                  sx={{
                    color: 'text.primary',
                    fontSize: '0.9rem',
                    minHeight: 44,
                    '&:hover': { bgcolor: `${color}14`, color },
                  }}
                >
                  {label}
                </MenuItem>
              ))}
            </StyledMenu>

            <MuiLink component={Link} href="/contact" sx={navLinkSx(pathname === '/contact', overHero)}>
              Contact
            </MuiLink>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, ml: 0.5 }}>
              {user ? (
                <AccountMenu user={user} />
              ) : (
                <>
                  <MuiLink
                    component={Link}
                    href="/login"
                    sx={{
                      color: overHero ? 'rgba(255,255,255,0.86)' : 'text.primary',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      py: 1,
                      '&:hover': { color: overHero ? '#fff' : 'primary.main' },
                    }}
                  >
                    Sign in
                  </MuiLink>
                  <CustomButton href="/register" variant="contained" sx={{ py: 0.75, px: 2, fontSize: '0.85rem', minHeight: 40 }}>
                    Get started
                  </CustomButton>
                </>
              )}
            </Box>
          </Box>

          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: 'flex', lg: 'none' }, color: overHero ? '#fff' : 'text.primary' }}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={closeDrawer}
        ModalProps={{ keepMounted: true }}
        slotProps={{
          paper: {
            sx: {
              width: 'min(100%, 320px)',
              bgcolor: 'background.paper',
              pt: 'env(safe-area-inset-top)',
            },
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
