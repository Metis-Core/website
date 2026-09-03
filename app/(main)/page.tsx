import Link from 'next/link';
import { Box, Container, Grid, Typography } from '@mui/material';
import {
  PublicOutlined,
  SignalCellularAltOutlined,
  TrendingUpOutlined,
  AccessTimeOutlined,
} from '@mui/icons-material';
import Hero from '@/components/hero';
import FeatureCard from '@/components/feature-card';
import StatsCard from '@/components/stats-card';
import CustomButton from '@/components/button';
import { DynamicIcon } from '@/components/dynamic-icon';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Service } from '@/lib/supabase/types';

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .limit(4);
  const services = (data ?? []) as Service[];

  const stats = [
    { number: '4', label: 'Population Coverage', icon: <PublicOutlined sx={{ fontSize: 24 }} /> },
    { number: '28', label: 'Internet Penetration %', icon: <SignalCellularAltOutlined sx={{ fontSize: 24 }} /> },
    { number: '96', label: 'Potential Reach %', icon: <TrendingUpOutlined sx={{ fontSize: 24 }} /> },
    { number: '12', label: 'Weekly Data Searching (hrs)', icon: <AccessTimeOutlined sx={{ fontSize: 24 }} /> },
  ];

  return (
    <>
      <Hero
        title="We Build the Data Foundations Behind Great Products and Decisions"
        subtitle="Data Infrastructure • Data Solutions • Analytics"
        description="Metis is a data-focused company that helps teams design, build, and run reliable data systems. We work where data, software, and decision-making meet."
        imageSrc="/assets/PNG/LOGO%20DARK%20GREY.png"
        imageAlt="Metis Analytica"
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <CustomButton component={Link} href="/consultation" variant="contained" size="large">
            Book a Consultation
          </CustomButton>
          <CustomButton component={Link} href="/consultation?type=demo" variant="outlined" size="large">
            Request a Demo
          </CustomButton>
        </Box>
        <Typography variant="caption" sx={{ display: 'block', color: '#666', mt: 2 }}>
          Free · 45 minutes · No sign-up required
        </Typography>
      </Hero>

      {/* Problem Statement */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.875rem', mb: 1 }}>
            The Reality in Uganda & Emerging Markets
          </Typography>
          <Typography
            variant="h3"
            sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' }, fontWeight: 700, color: '#000', mb: 4 }}
          >
            Most Organizations Are Still Trapped in the Excel Era
          </Typography>
          <Grid container spacing={3} sx={{ maxWidth: '900px', mx: 'auto' }}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <StatsCard
                  number={stat.number}
                  label={stat.label}
                  icon={stat.icon}
                  color={['#737373', '#dc004e', '#00897b', '#f57c00'][index]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Core Services (DB-backed) */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.875rem' }}>
            What We Do
          </Typography>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: '#000', mb: 2 }}
          >
            The Data Operating System
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', maxWidth: '600px', mx: 'auto', fontSize: '1.125rem' }}>
            Four integrated layers that transform how your organization uses data
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={service.id}>
              <FeatureCard
                icon={<DynamicIcon name={service.icon} sx={{ fontSize: 40 }} />}
                title={service.title}
                description={service.description}
                color={service.color}
                href="/services"
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Impact Stats */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(220, 0, 78, 0.1) 100%)',
          py: 8,
          borderRadius: '16px',
          mx: 2,
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#737373', mb: 1 }}>20%</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Revenue increase through data-driven decisions
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#dc004e', mb: 1 }}>25-50%</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Cost reduction through automation
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#00897b', mb: 1 }}>90%</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Faster transaction processing
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#f57c00', mb: 1 }}>32.71%</Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Efficiency gains for SMEs
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, fontWeight: 700, color: '#000', mb: 2 }}
        >
          Ready to Build Your Data Foundation?
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4, fontSize: '1.125rem' }}>
          Let&apos;s talk about your data challenges and how Metis can transform your operations
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <CustomButton component={Link} href="/consultation" variant="contained" size="large">
            Book a Consultation
          </CustomButton>
          <CustomButton component={Link} href="/contact" variant="outlined" size="large">
            Start a Conversation
          </CustomButton>
        </Box>
      </Container>
    </>
  );
}
