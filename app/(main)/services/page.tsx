'use client';

import { FC } from 'react';
import { Box, Container, Typography, Grid, Chip, Card } from '@mui/material';
import {
  Storage,
  AnalyticsOutlined,
  Autorenew,
  SecurityOutlined,
  BusinessOutlined,
  PeopleOutlined,
  BuildOutlined,
  PublicOutlined,
} from '@mui/icons-material';
import Hero from '@/components/hero';
import StatsCard from '@/components/stats-card';
import CustomButton from '@/components/button';

const Services: FC = () => {
  const layers = [
    {
      layer: 'Layer 1',
      title: 'Data Infrastructure & Architecture',
      description:
        'The foundation. We design, build, and deploy sovereign data architectures that scale with your institution.',
      icon: <Storage sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      capabilities: [
        'Data audits & assessments',
        'Cloud platform selection & setup',
        'ETL pipelines & integrations',
        'Database design & optimization',
        'Data governance frameworks',
      ],
      industries: ['All sectors'],
    },
    {
      layer: 'Layer 2',
      title: 'Data Solutions & Systems Development',
      description:
        'Custom-built software systems that sit on top of your infrastructure, purpose-built for your exact workflows.',
      icon: <Autorenew sx={{ fontSize: 40 }} />,
      color: '#dc004e',
      capabilities: [
        'Bespoke data applications',
        'Business process automation',
        'Custom dashboards & reporting',
        'Workflow orchestration',
        'Integration platforms',
      ],
      industries: ['All sectors'],
    },
    {
      layer: 'Layer 3',
      title: 'Data Custodianship & Managed Services',
      description:
        'We become the steward of your data. Long-term management, monitoring, support, and evolution of your data systems.',
      icon: <SecurityOutlined sx={{ fontSize: 40 }} />,
      color: '#00897b',
      capabilities: [
        '24/7 managed monitoring',
        'Data quality assurance',
        'Security & compliance management',
        'Performance optimization',
        'SLA-backed reliability',
        'Team augmentation & training',
      ],
      industries: ['All sectors'],
    },
    {
      layer: 'Layer 4',
      title: 'Analytics, Intelligence & Decision Support',
      description:
        'Transform raw data into institutional intelligence. Advanced analytics, forecasting, and decision support.',
      icon: <AnalyticsOutlined sx={{ fontSize: 40 }} />,
      color: '#f57c00',
      capabilities: [
        'Advanced analytics & BI',
        'Predictive modeling & forecasting',
        'AI/ML model development',
        'Sector intelligence platforms',
        'Policy & scenario modeling',
        'Decision support systems',
      ],
      industries: ['All sectors'],
    },
  ];

  const segments = [
    {
      name: 'NGOs & Non-Profits',
      icon: <PeopleOutlined sx={{ fontSize: 32 }} />,
      use_cases: [
        'Program impact tracking',
        'Beneficiary management at scale',
        'Grant reporting automation',
        'Operational efficiency',
      ],
      color: '#1976d2',
    },
    {
      name: 'SMEs & Growing Companies',
      icon: <BuildOutlined sx={{ fontSize: 32 }} />,
      use_cases: [
        'Sales & revenue analytics',
        'Inventory & supply chain',
        'Customer data platforms',
        'Financial forecasting',
      ],
      color: '#dc004e',
    },
    {
      name: 'Corporations & Large Enterprises',
      icon: <BusinessOutlined sx={{ fontSize: 32 }} />,
      use_cases: [
        'Business intelligence platforms',
        'Cross-department data lakes',
        'Real-time operational dashboards',
        'Advanced forecasting',
      ],
      color: '#00897b',
    },
    {
      name: 'Government & Public Sector',
      icon: <PublicOutlined sx={{ fontSize: 32 }} />,
      use_cases: [
        'Policy evidence & evaluation',
        'Service delivery optimization',
        'Public sector analytics',
        'Compliance & reporting',
      ],
      color: '#f57c00',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Understand',
      description: 'We audit your current state: systems, data, processes, pain points.',
    },
    {
      step: '02',
      title: 'Design',
      description: 'We architect a data operating system tailored to your specific needs and ambitions.',
    },
    {
      step: '03',
      title: 'Build',
      description: 'We implement infrastructure, systems, and automation with your team embedded.',
    },
    {
      step: '04',
      title: 'Optimize',
      description: 'We continuously refine performance, security, and impact.',
    },
    {
      step: '05',
      title: 'Evolve',
      description: 'We upgrade your systems as your institution grows and markets change.',
    },
    {
      step: '06',
      title: 'Partner',
      description: 'We transition from project to long-term managed partnership.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Our Services"
        subtitle="The 4-Layer Data Operating System"
        description="From infrastructure to intelligence—Metis builds the complete data stack your institution needs to compete and grow."
      />

      {/* Introduction */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ maxWidth: '900px', mx: 'auto', textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: '#000', mb: 3 }}
          >
            Why a 4-Layer Approach?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', lineHeight: 1.8, fontSize: '1.08rem', mb: 4 }}
          >
            Most data companies specialize in one layer. We specialize in all four. This means:
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>
                ✓ No vendor lock-in from missing layers
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>
                ✓ Seamless integration across your entire stack
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="body2" sx={{ color: '#666', fontWeight: 600 }}>
                ✓ One trusted point of contact from infrastructure to insights
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* 4 Layers */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {layers.map((layer, index) => (
          <Box
            key={index}
            sx={{
              mb: 6,
              p: 4,
              borderRadius: '12px',
              border: `2px solid ${layer.color}`,
              backgroundColor: layer.color === '#737373' ? '#f5f9ff' : layer.color === '#dc004e' ? '#fff5f8' : layer.color === '#00897b' ? '#f5fff8' : '#fffaf5',
            }}
          >
            <Grid container spacing={3} sx={{ alignItems: 'flex-start' }}>
              <Grid size={{ xs: 12, md: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', color: layer.color }}>
                  {layer.icon}
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 11 }}>
                <Box>
                  <Chip
                    label={layer.layer}
                    sx={{
                      backgroundColor: layer.color,
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      mb: 1,
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 700, color: '#000', mb: 1 }}
                  >
                    {layer.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: '#666', mb: 3, lineHeight: 1.7 }}
                  >
                    {layer.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 700, color: '#000', mb: 1 }}
                    >
                      What We Deliver:
                    </Typography>
                    <Grid container spacing={1}>
                      {layer.capabilities.map((cap, idx) => (
                        <Grid size={{ xs: 12, sm: 6 }} key={idx}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                backgroundColor: layer.color,
                                flexShrink: 0,
                              }}
                            />
                            <Typography variant="body2" sx={{ color: '#666' }}>
                              {cap}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Container>

      {/* Market Segments */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: '#000', mb: 2 }}
          >
            Market Segments We Serve
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', maxWidth: '700px', mx: 'auto', fontSize: '1.08rem' }}
          >
            Every sector faces similar data challenges. We customize our support for unique needs.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {segments.map((segment, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <StatsCard
                icon={segment.icon}
                label={segment.name}
                description="Common Use Cases"
                features={segment.use_cases}
                color={segment.color}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Process */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: '#000', mb: 2 }}
          >
            Our Service Process
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', maxWidth: '700px', mx: 'auto', fontSize: '1.08rem' }}
          >
            From discovery to partnership
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {process.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ p: 3, textAlign: 'center', h: '100%', borderRadius: '12px' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#737373',
                    mb: 2,
                  }}
                >
                  {item.step}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#000', mb: 1 }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.6 }}>
                  {item.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Box sx={{ backgroundColor: '#f9f9f9', py: 8 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, color: '#000', mb: 3 }}
          >
            Ready to Transform Your Data?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', mb: 4, fontSize: '1.08rem' }}
          >
            Let's discuss which layers of our data operating system your institution needs.
          </Typography>
          <CustomButton variant="contained">Start a Conversation</CustomButton>
        </Container>
      </Box>
    </>
  );
};

export default Services;
