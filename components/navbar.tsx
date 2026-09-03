'use client';

import { FC, useState } from 'react';
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
import NavbarSearchButton from '@/components/navbar-search';
import AccountMenu, { type AccountMenuUser } from '@/components/account-menu';
import CustomButton from '@/components/button';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.4)',
  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.05)',
  borderRadius: '16px',
  margin: '16px auto',
  width: 'calc(100% - 32px)',
  maxWidth: '1200px',
  position: 'fixed',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1000,
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backdropFilter: 'blur(12px)',
    background: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '12px',
    marginTop: '8px',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
  },
}));

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Consultation', href: '/consultation' },
  { label: 'Careers', href: '/careers' },
];

const products = [
  { label: 'Metis Database', href: '/products/metis-database', color: '#737373' },
  { label: 'Metis Security', href: '/products/metis-security', color: '#dc004e' },
  { label: 'Data Sharing', href: '/products/data-sharing', color: '#00897b' },
  { label: 'Metis Analytics', href: '/products/metis-analytics', color: '#f57c00' },
];

const Navbar: FC<{ user?: AccountMenuUser | null }> = ({ user = null }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [anchorElProducts, setAnchorElProducts] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProductsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProducts(event.currentTarget);
    setProductsOpen(true);
  };

  const handleProductsClose = () => {
    setAnchorElProducts(null);
    setProductsOpen(false);
  };

  const drawer = (
    <Box sx={{ p: 2, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, gap: 1 }}>
        <Link href="/" onClick={handleDrawerToggle} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Image
            src="/assets/PNG/LOGO%20DARK%20GREY.png"
            alt="Metis Analytica"
            width={140}
            height={40}
            style={{ height: 36, width: 'auto', objectFit: 'contain' }}
            priority
          />
        </Link>
        <Box sx={{ flex: 1 }}>
          <NavbarSearchButton />
        </Box>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <ListItem key={label} disablePadding>
              <ListItemButton
                component={Link}
                href={href}
                onClick={handleDrawerToggle}
                sx={{
                  color: isActive ? '#737373' : '#000',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  backgroundColor: isActive ? '#73737310' : 'transparent',
                  borderLeft: isActive ? '4px solid #737373' : 'none',
                  paddingLeft: isActive ? '12px' : '16px',
                  '&:hover': {
                    backgroundColor: isActive ? '#73737310' : '#f0f0f0',
                    color: '#737373',
                  },
                }}
              >
                {label}
              </ListItemButton>
            </ListItem>
          );
        })}
        <ListItem disablePadding>
          {(() => {
            const isProductActive = pathname.startsWith('/products');
            return (
              <ListItemButton
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                sx={{
                  color: isProductActive ? '#737373' : '#000',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  display: 'flex',
                  justifyContent: 'space-between',
                  backgroundColor: isProductActive ? '#73737310' : 'transparent',
                  borderLeft: isProductActive ? '4px solid #737373' : 'none',
                  paddingLeft: isProductActive ? '12px' : '16px',
                  '&:hover': {
                    backgroundColor: isProductActive ? '#73737310' : '#f0f0f0',
                    color: '#737373',
                  },
                }}
              >
                Products
                <ExpandMoreIcon
                  sx={{
                    transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease',
                    fontSize: '1.2rem',
                  }}
                />
              </ListItemButton>
            );
          })()}
        </ListItem>
        <Collapse in={mobileProductsOpen} timeout="auto">
          <List component="div" disablePadding>
            {products.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <ListItemButton
                  key={label}
                  component={Link}
                  href={href}
                  onClick={handleDrawerToggle}
                  sx={{
                    pl: 4,
                    color: isActive ? '#737373' : '#666',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    backgroundColor: isActive ? '#73737310' : 'transparent',
                    borderLeft: isActive ? '4px solid #737373' : 'none',
                    '&:hover': {
                      backgroundColor: isActive ? '#73737310' : '#f0f0f0',
                      color: '#737373',
                    },
                  }}
                >
                  {label}
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
        <ListItem disablePadding>
          {(() => {
            const isActive = pathname === '/contact';
            return (
              <ListItemButton
                component={Link}
                href="/contact"
                onClick={handleDrawerToggle}
                sx={{
                  color: isActive ? '#737373' : '#000',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  backgroundColor: isActive ? '#73737310' : 'transparent',
                  borderLeft: isActive ? '4px solid #737373' : 'none',
                  paddingLeft: isActive ? '12px' : '16px',
                  '&:hover': {
                    backgroundColor: isActive ? '#73737310' : '#f0f0f0',
                    color: '#737373',
                  },
                }}
              >
                Contact
              </ListItemButton>
            );
          })()}
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {user ? (
        <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#666', fontWeight: 700, letterSpacing: '0.08em' }}>
            SIGNED IN AS
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
            {user.fullName ?? user.email}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
            <MuiLink component={Link} href="/account" onClick={handleDrawerToggle} sx={{ color: '#000', textDecoration: 'none', py: 0.5 }}>
              My profile
            </MuiLink>
            <MuiLink component={Link} href="/account/settings" onClick={handleDrawerToggle} sx={{ color: '#000', textDecoration: 'none', py: 0.5 }}>
              Settings
            </MuiLink>
            {user.role === 'admin' && (
              <MuiLink component={Link} href="/admin" onClick={handleDrawerToggle} sx={{ color: '#000', textDecoration: 'none', py: 0.5, fontWeight: 700 }}>
                Admin dashboard
              </MuiLink>
            )}
          </Box>
        </Box>
      ) : (
        <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <CustomButton component={Link} href="/login" variant="outlined" onClick={handleDrawerToggle} fullWidth>
            Sign in
          </CustomButton>
          <CustomButton component={Link} href="/register" variant="contained" onClick={handleDrawerToggle} fullWidth>
            Create account
          </CustomButton>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, gap: 3 }}>
        {/* Logo, Brand & Search */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Logo & Brand — wordmark on every breakpoint, scales down on mobile */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box sx={{ position: 'relative', width: { xs: 130, sm: 170 }, height: { xs: 34, sm: 42 } }}>
              <Image
                src="/assets/PNG/LOGO%20DARK%20GREY.png"
                alt="Metis Analytica"
                fill
                sizes="(max-width: 600px) 130px, 170px"
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
                priority
              />
            </Box>
          </Link>

          {/* Search Bar - Close to Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavbarSearchButton />
          </Box>
        </Box>

        {/* Desktop Navigation - Right Side */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center', ml: 'auto' }}>
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <MuiLink
                key={label}
                component={Link}
                href={href}
                sx={{
                  color: isActive ? '#737373' : '#000',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  ...(isActive && {
                    border: '2px solid #737373',
                    borderRadius: '8px',
                    px: 1.5,
                    py: 0.5,
                  }),
                  '&:hover': {
                    color: '#737373',
                    '&::after': {
                      width: isActive ? '0%' : '100%',
                    },
                  },
                  '&::after': isActive ? {} : {
                    content: '""',
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    width: 0,
                    height: 2,
                    backgroundColor: '#737373',
                    transition: 'width 0.3s ease',
                  },
                }}
              >
                {label}
              </MuiLink>
            );
          })}

          {/* Products Dropdown */}
          <Box sx={{ position: 'relative' }}>
            {(() => {
              const isProductActive = pathname.startsWith('/products');
              return (
                <Box
                  onClick={handleProductsClick}
                  sx={{
                    color: isProductActive ? '#737373' : '#000',
                    textDecoration: 'none',
                    fontWeight: 500,
                    fontSize: '0.95rem',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    ...(isProductActive && {
                      border: '2px solid #737373',
                      borderRadius: '8px',
                      px: 1.5,
                      py: 0.5,
                    }),
                    '&:hover': {
                      color: '#737373',
                      '&::after': {
                        width: isProductActive ? '0%' : '100%',
                      },
                    },
                    '&::after': isProductActive ? {} : {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: 0,
                      height: 2,
                      backgroundColor: '#737373',
                      transition: 'width 0.3s ease',
                    },
                  }}
                >
                  Products
                  <ExpandMoreIcon
                    sx={{
                      fontSize: '1.1rem',
                      transform: productsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </Box>
              );
            })()}
            
            <StyledMenu
              anchorEl={anchorElProducts}
              open={productsOpen}
              onClose={handleProductsClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {products.map(({ label, href, color }) => (
                <MenuItem
                  key={label}
                  component={Link}
                  href={href}
                  onClick={handleProductsClose}
                  sx={{
                    color: '#000',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    position: 'relative',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: `${color}10`,
                      color: color,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      backgroundColor: color,
                      transform: 'scaleY(0)',
                      transformOrigin: 'center',
                      transition: 'transform 0.3s ease',
                    },
                    '&:hover::before': {
                      transform: 'scaleY(1)',
                    },
                  }}
                >
                  {label}
                </MenuItem>
              ))}
            </StyledMenu>
          </Box>

          <MuiLink
            component={Link}
            href="/contact"
            sx={(() => {
              const isActive = pathname === '/contact';
              return {
                color: isActive ? '#737373' : '#000',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
                position: 'relative',
                transition: 'all 0.3s ease',
                ...(isActive && {
                  border: '2px solid #737373',
                  borderRadius: '8px',
                  px: 1.5,
                  py: 0.5,
                }),
                '&:hover': {
                  color: '#737373',
                  '&::after': {
                    width: isActive ? '0%' : '100%',
                  },
                },
                '&::after': isActive ? {} : {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: 0,
                  height: 2,
                  backgroundColor: '#737373',
                  transition: 'width 0.3s ease',
                },
              };
            })()}
          >
            Contact
          </MuiLink>

          {/* Auth CTA / Account menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
            {user ? (
              <AccountMenu user={user} />
            ) : (
              <>
                <MuiLink
                  component={Link}
                  href="/login"
                  sx={{ color: '#000', textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem' }}
                >
                  Sign in
                </MuiLink>
                <CustomButton
                  component={Link}
                  href="/register"
                  variant="contained"
                  sx={{ py: 0.5, px: 2, fontSize: '0.85rem' }}
                >
                  Get started
                </CustomButton>
              </>
            )}
          </Box>
        </Box>

        {/* Mobile Menu Button */}
        <IconButton
          onClick={handleDrawerToggle}
          sx={{ display: { xs: 'flex', md: 'none' }, color: '#000' }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="top" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
