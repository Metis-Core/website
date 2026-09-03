'use client';

import { FC } from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#000',
        color: '#fff',
        py: 8,
        mt: 12,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Brand Section */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Image
              src="/logo/logo.png"
              alt="Metis logo"
              width={120}
              height={40}
              style={{ marginBottom: '16px' }}
            />
            <Typography variant="body2" sx={{ color: '#aaa', mb: 2 }}>
              Data Infrastructure. Data Solutions. Trusted Data Custodians.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <a href="#" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Facebook size={20} />
              </a>
              <a href="#" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Twitter size={20} />
              </a>
              <a href="#" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Linkedin size={20} />
              </a>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/" sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}>
                Home
              </Link>
              <Link href="/about" sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}>
                About
              </Link>
              <Link href="/services" sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}>
                Services
              </Link>
              <Link href="/contact" sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}>
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Services */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Our Layers
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/services" sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}>
                Data Infrastructure
              </Link>
              <Link href="/services" sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}>
                Data Solutions
              </Link>
              <Link href="/services" sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}>
                Data Custodianship
              </Link>
              <Link href="/services" sx={{ color: '#aaa', '&:hover': { color: '#fff' } }}>
                Analytics & Intelligence
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="mailto:hello@metis.com"
                sx={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: 1, '&:hover': { color: '#fff' } }}
              >
                <Mail size={18} /> hello@metis.com
              </Link>
              <Typography variant="body2" sx={{ color: '#aaa' }}>
                +256 701 234 567
              </Typography>
              <Typography variant="body2" sx={{ color: '#aaa' }}>
                Kampala, Uganda
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box sx={{ borderTop: '1px solid #333', py: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              © {currentYear} Metis. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Link href="#" sx={{ color: '#aaa', fontSize: '0.875rem', '&:hover': { color: '#fff' } }}>
                Privacy Policy
              </Link>
              <Link href="#" sx={{ color: '#aaa', fontSize: '0.875rem', '&:hover': { color: '#fff' } }}>
                Terms of Service
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
