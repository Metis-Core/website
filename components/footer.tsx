'use client';

import { FC } from 'react';
import { Box, Container, Typography, Link, Grid, Stack } from '@mui/material';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import NextLink from 'next/link';
import { brand } from '@/lib/brand';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: brand.graphiteBlack,
        color: '#fff',
        py: { xs: 5, md: 8 },
        mt: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: { xs: 4, md: 6 } }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Image
              src="/assets/PNG/LOGO%20WHITE.png"
              alt="Metis Analytica"
              width={160}
              height={48}
              style={{ marginBottom: 16, height: 40, width: 'auto', objectFit: 'contain' }}
            />
            <Typography variant="body2" sx={{ color: brand.graphiteGrey, mb: 2, maxWidth: 280 }}>
              Data Infrastructure. Data Solutions. Trusted Data Custodians.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1rem' }}>
              Quick Links
            </Typography>
            <Stack spacing={0.5}>
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/services', label: 'Services' },
                { href: '/products', label: 'Products' },
                { href: '/careers', label: 'Careers' },
                { href: '/contact', label: 'Contact' },
              ].map((item) => (
                <Link
                  key={item.href}
                  component={NextLink}
                  href={item.href}
                  sx={{ color: brand.graphiteGrey, py: 0.75, textDecoration: 'none', '&:hover': { color: '#fff' } }}
                >
                  {item.label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1rem' }}>
              Our Layers
            </Typography>
            <Stack spacing={0.5}>
              {[
                'Data Infrastructure',
                'Data Solutions',
                'Data Custodianship',
                'Analytics & Intelligence',
              ].map((label) => (
                <Link
                  key={label}
                  component={NextLink}
                  href="/services"
                  sx={{ color: brand.graphiteGrey, py: 0.75, textDecoration: 'none', '&:hover': { color: '#fff' } }}
                >
                  {label}
                </Link>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, fontSize: '1rem' }}>
              Contact Us
            </Typography>
            <Stack spacing={1}>
              <Link
                href="mailto:info@metisanalytica.com"
                sx={{
                  color: brand.graphiteGrey,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  py: 0.75,
                  minHeight: 44,
                  textDecoration: 'none',
                  '&:hover': { color: '#fff' },
                }}
              >
                <Mail size={18} /> info@metisanalytica.com
              </Link>
              <Typography variant="body2" sx={{ color: brand.graphiteGrey }}>
                Diana Nansereko (CEO) — 0787364428
              </Typography>
              <Typography variant="body2" sx={{ color: brand.graphiteGrey }}>
                Mariam Mugisha (CMO) — 0773102366
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.12)', pt: 3 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
            }}
          >
            <Typography variant="body2" sx={{ color: brand.graphiteGrey }}>
              © {currentYear} Metis Analytica. All rights reserved.
            </Typography>
            <Typography variant="body2" sx={{ color: brand.graphiteGrey }}>
              Reliable Data. Smarter Operations.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
