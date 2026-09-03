'use client';

import { FC } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { VerifiedUser, Lightbulb, Gavel, AutoFixHigh } from '@mui/icons-material';
import Hero from '@/components/hero';
import StatsCard from '@/components/stats-card';
import CustomButton from '@/components/button';

const About: FC = () => {
  const coreValues = [
    {
      icon: <VerifiedUser sx={{ fontSize: 32 }} />,
      title: 'Data Custodianship',
      description: 'We take responsibility for your institutional data. It\'s protected, structured, and evolves with your needs.',
      color: '#737373',
    },
    {
      icon: <Lightbulb sx={{ fontSize: 32 }} />,
      title: 'Infrastructure-First',
      description: 'Strong foundations enable innovation. We design for scale, reliability, and long-term institutional value.',
      color: '#dc004e',
    },
    {
      icon: <Gavel sx={{ fontSize: 32 }} />,
      title: 'Security & Governance',
      description: 'Security is embedded, not bolted on. Clear ownership, transparent processes, and ethical data use.',
      color: '#00897b',
    },
    {
      icon: <AutoFixHigh sx={{ fontSize: 32 }} />,
      title: 'Practical Impact',
      description: 'We don\'t build for theory. Every system drives real decisions, efficiency, and institutional accountability.',
      color: '#f57c00',
    },
  ];

  const phases = [
    {
      phase: 'Phase 1',
      title: 'Foundation Builder',
      description: 'Focus: Data Infrastructure & Solutions. We establish the data backbone your institution needs to operate intelligently.',
      items: ['Data audits', 'Cloud platforms', 'Data integration', 'Initial dashboards'],
    },
    {
      phase: 'Phase 2',
      title: 'Institutional Data Partner',
      description: 'Focus: Custodianship & Long-term Management. From projects to partnerships—we become the steward of your data.',
      items: ['Long-term contracts', 'Advanced analytics', 'SLA-backed reliability', 'Embedded data teams'],
    },
    {
      phase: 'Phase 3',
      title: 'Data Intelligence Platform',
      description: 'Focus: Shared Assets & Sector Intelligence. Cross-institutional datasets and big data ventures.',
      items: ['Sector intelligence', 'Policy modeling', 'Advanced AI/ML', 'Data partnerships'],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="About Metis"
        subtitle="The Company"
        description="Metis is a data custodian and partner that designs, builds, and safeguards data infrastructures while transforming data into long-term institutional value."
      />

      {/* Core Identity */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, mb: 3, color: '#000' }}
              >
                Who We Are
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#666', lineHeight: 1.8, mb: 4, fontSize: '1.08rem' }}
              >
                Metis is a pure data and automation company. We don't sell IT support. We don't sell generic software. We build data operating systems with embedded automation.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#666', lineHeight: 1.8, mb: 4, fontSize: '1.08rem' }}
              >
                We work where data, software, and decision-making meet. Our mission: to help organizations—NGOs, SMEs, corporations, and governments—transform data from a liability into a strategic asset.
              </Typography>
              <CustomButton variant="contained">Learn Our Approach</CustomButton>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 700, mb: 3, color: '#000' }}
              >
                What Sets Us Apart
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#737373', mb: 1 }}>
                    Not a BI Shop
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    We don't just build dashboards. We architect the entire data operating system beneath them.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#737373', mb: 1 }}>
                    Not a Cloud Reseller
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    We specialize in the hardest part: sovereign data architecture and automation engineering.
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#737373', mb: 1 }}>
                    The Trusted Point of Contact
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    We sit quietly but powerfully between raw data and institutional decisions—owning the responsibility for both.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Core Values */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: '#000', mb: 2 }}
          >
            Our Core Values
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', maxWidth: '600px', mx: 'auto', fontSize: '1.08rem' }}
          >
            The principles that guide everything we build
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {coreValues.map((value, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <StatsCard
                icon={value.icon}
                label={value.title}
                description={value.description}
                color={value.color}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Growth Phases */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: '#000', mb: 2 }}
          >
            Our Evolution
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', maxWidth: '700px', mx: 'auto', fontSize: '1.08rem' }}
          >
            From Foundation Builder to Data Intelligence Platform—a scalable path to institutional value
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {phases.map((item, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <StatsCard
                title={item.title}
                label={item.phase}
                description={item.description}
                features={item.items}
                color={['#737373', '#dc004e', '#00897b'][index]}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trust Statement */}
      <Box sx={{ backgroundColor: '#f9f9f9', py: 8, borderRadius: '16px', mx: 2, mb: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: '#000', mb: 3 }}
            >
              Built to Be Trusted
            </Typography>
            <Grid container spacing={3} sx={{ maxWidth: '900px', mx: 'auto' }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#737373', mb: 1 }}>
                    Secure by Design
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Security isn't an afterthought. It's embedded into every layer of our systems.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#dc004e', mb: 1 }}>
                    Clear Data Ownership
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    Your data is yours. We don't monetize it. We protect and empower it.
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#00897b', mb: 1 }}>
                    Long-term Reliability
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    We think in years, not quarters. Your data infrastructure evolves with your needs.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default About;
