'use client';

import { FC } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import {
  Storage,
  AnalyticsOutlined,
  Autorenew,
  SecurityOutlined,
  PublicOutlined,
  SignalCellularAltOutlined,
  TrendingUpOutlined,
  AccessTimeOutlined,
} from '@mui/icons-material';
import Hero from '@/components/hero';
import FeatureCard from '@/components/feature-card';
import StatsCard from '@/components/stats-card';
import CustomButton from '@/components/button';

const Home: FC = () => {
  const stats = [
    {
      number: '4',
      label: 'Population Coverage',
      icon: <PublicOutlined sx={{ fontSize: 24 }} />,
    },
    {
      number: '28',
      label: 'Internet Penetration %',
      icon: <SignalCellularAltOutlined sx={{ fontSize: 24 }} />,
    },
    {
      number: '96',
      label: 'Potential Reach %',
      icon: <TrendingUpOutlined sx={{ fontSize: 24 }} />,
    },
    {
      number: '12',
      label: 'Weekly Data Searching (hrs)',
      icon: <AccessTimeOutlined sx={{ fontSize: 24 }} />,
    },
  ];

  const services = [
    {
      icon: <Storage sx={{ fontSize: 40 }} />,
      title: 'Data Infrastructure',
      description: 'Centralized data platforms, cloud architectures, and integration pipelines that unify your institutional data.',
      color: '#737373',
    },
    {
      icon: <AnalyticsOutlined sx={{ fontSize: 40 }} />,
      title: 'Analytics & Intelligence',
      description: 'Real-time dashboards, predictive models, and decision-support systems that turn data into insight.',
      color: '#dc004e',
    },
    {
      icon: <Autorenew sx={{ fontSize: 40 }} />,
      title: 'Automation & Processes',
      description: 'Intelligent workflows that automate reporting, approvals, and monitoring to trigger smart actions.',
      color: '#00897b',
    },
    {
      icon: <SecurityOutlined sx={{ fontSize: 40 }} />,
      title: 'Data Custodianship',
      description: 'Long-term stewardship of institutional data with governance, security, and reliability baked in.',
      color: '#f57c00',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="We Build the Data Foundations Behind Great Products and Decisions"
        subtitle="Data Infrastructure • Data Solutions • Analytics"
        description="Metis is a data-focused company that helps teams design, build, and run reliable data systems. We work where data, software, and decision-making meet."
        imageSrc="/logo/logo.png"
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <CustomButton variant="contained">Work with Metis</CustomButton>
          <CustomButton variant="outlined">What We Build</CustomButton>
        </Box>
      </Hero>

      {/* Problem Statement */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.875rem', mb: 1 }}
          >
            The Reality in Uganda & Emerging Markets
          </Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 700,
              color: '#000',
              mb: 4,
            }}
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

      {/* Core Problem */}
      <Container maxWidth="lg" sx={{ py: 12, backgroundColor: '#f9f9f9', borderRadius: '16px', mb: 8 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#000',
                  mb: 3,
                }}
              >
                The "Excel Trap" & Data Silos
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#dc004e', mb: 1 }}>
                    12 Hours Per Week Wasted
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                    Knowledge workers spend an average of 12 hours searching for and chasing data across fragmented systems.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#dc004e', mb: 1 }}>
                    Data in the Dark
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                    Institutional intelligence is trapped in isolated Excel files, physical folders, and departmental silos.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#dc004e', mb: 1 }}>
                    Manual Everything
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                    Manual reporting, reconciliation, approvals, and monitoring create inefficiency, corruption risk, and slow decisions.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#000',
                  mb: 3,
                }}
              >
                What Metis Brings
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#737373', mb: 1 }}>
                    Single Source of Truth
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                    Centralized data infrastructure that eliminates silos and surfaces institutional knowledge instantly.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#737373', mb: 1 }}>
                    From Viewing to Acting
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                    Move beyond static dashboards to intelligent automation that triggers real action in response to data.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#737373', mb: 1 }}>
                    Data Trusted & Secured
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                    Long-term custodianship with embedded governance, security, and reliability—not bolted-on compliance.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Core Services */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="overline"
            sx={{ color: 'primary.main', fontWeight: 700, fontSize: '0.875rem' }}
          >
            What We Do
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              color: '#000',
              mb: 2,
            }}
          >
            The Data Operating System
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', maxWidth: '600px', mx: 'auto', fontSize: '1.125rem' }}
          >
            Four integrated layers that transform how your organization uses data
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <FeatureCard {...service} />
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
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#737373', mb: 1 }}>
                  20%
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Revenue increase through data-driven decisions
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#dc004e', mb: 1 }}>
                  25-50%
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Cost reduction through automation
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#00897b', mb: 1 }}>
                  90%
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Faster transaction processing
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontSize: '2.5rem', fontWeight: 700, color: '#f57c00', mb: 1 }}>
                  32.71%
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Efficiency gains for SMEs
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#000',
            mb: 2,
          }}
        >
          Ready to Build Your Data Foundation?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#666', mb: 4, fontSize: '1.125rem' }}
        >
          Let's talk about your data challenges and how Metis can transform your operations
        </Typography>
        <CustomButton variant="contained" size="large">
          Start a Conversation
        </CustomButton>
      </Container>
    </>
  );
};

export default Home;
