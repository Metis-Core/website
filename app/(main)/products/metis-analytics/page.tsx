'use client';

import { FC } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Analytics, TrendingUp, SmartToy, Speed } from '@mui/icons-material';
import Hero from '@/components/hero';
import CustomButton from '@/components/button';
import StatsCard from '@/components/stats-card';

const MetisAnalytics: FC = () => {
  const features = [
    {
      icon: <Analytics sx={{ fontSize: 32 }} />,
      title: 'Real-time Dashboards',
      description: 'Interactive, live dashboards that update instantly. Decision-makers get current insights without waiting for monthly reports.',
      color: '#f57c00',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      title: 'Predictive Analytics',
      description: 'Move beyond "what happened" to "what will happen." Forecasting models built on your data.',
      color: '#737373',
    },
    {
      icon: <SmartToy sx={{ fontSize: 32 }} />,
      title: 'AI-Powered Insights',
      description: 'Machine learning models that identify patterns, anomalies, and opportunities automatically.',
      color: '#dc004e',
    },
    {
      icon: <Speed sx={{ fontSize: 32 }} />,
      title: 'Fast Query Performance',
      description: 'Analytical queries on multi-terabyte datasets execute in seconds, not hours.',
      color: '#00897b',
    },
  ];

  const capabilities = [
    {
      title: 'Custom Dashboards',
      description: 'Build dashboards with drag-and-drop simplicity. Share with teams instantly.',
    },
    {
      title: 'Automated Reports',
      description: 'Schedule reports to automatically generate and distribute. Email, SMS, or API delivery.',
    },
    {
      title: 'Cohort Analysis',
      description: 'Segment users, beneficiaries, or transactions into cohorts and track behavior over time.',
    },
    {
      title: 'Scenario Modeling',
      description: 'Test "what-if" scenarios. Model policy changes, operational decisions, or strategic options.',
    },
    {
      title: 'Anomaly Detection',
      description: 'Automatic alerts when metrics deviate from normal. Catch problems before they grow.',
    },
    {
      title: 'Data Export',
      description: 'Export refined datasets for specialized analysis or external integrations.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <Hero
        title="Metis Analytics"
        subtitle="Transform Data into Intelligence"
        description="Real-time dashboards, predictive models, and AI-powered insights. Turn your data into decisions."
      />

      {/* Overview */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
                From Data to Decisions
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8, mb: 4, fontSize: '1.08rem' }}>
                Metis Analytics transforms raw data into actionable intelligence. Real-time dashboards, predictive models, and AI-powered insights work together to accelerate decision-making.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8, fontSize: '1.08rem' }}>
                Your teams stop guessing. They start knowing.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ backgroundColor: '#fffaf5', p: 4, borderRadius: '12px', border: '2px solid #f57c00' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#f57c00', mb: 3 }}>
                Analytics Stack
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ pb: 1, borderBottom: '1px solid #ffe0d0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f57c00', mb: 0.5 }}>
                    📊 Real-time BI
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Live dashboards with instant drill-downs
                  </Typography>
                </Box>
                <Box sx={{ pb: 1, borderBottom: '1px solid #ffe0d0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f57c00', mb: 0.5 }}>
                    🔮 Predictive Models
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Forecasting and scenario modeling
                  </Typography>
                </Box>
                <Box sx={{ pb: 1, borderBottom: '1px solid #ffe0d0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f57c00', mb: 0.5 }}>
                    🤖 AI Insights
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Automated pattern detection
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#f57c00', mb: 0.5 }}>
                    📈 Performance
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Sub-second query on terabyte datasets
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
            Analytics Capabilities
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
              <StatsCard
                label={feature.title}
                icon={feature.icon}
                color={feature.color}
                title={feature.title}
                details={feature.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Detailed Capabilities */}
      <Box sx={{ backgroundColor: '#f9f9f9', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
              Feature Deep Dive
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {capabilities.map((capability, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Card sx={{ p: 3, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#f57c00', mb: 2 }}>
                      {capability.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                      {capability.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Analytics Stats */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
            Analytics Performance
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', fontSize: '1.08rem' }}>
            Powered by enterprise-grade analytics infrastructure
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              number="500"
              label="Millisecond Queries"
              description="On TB datasets"
              color="#f57c00"
              icon={<Speed />}
              title="Lightning Fast"
              details="Execute complex analytical queries on massive datasets in milliseconds."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              number="10000"
              label="Daily Dashboards"
              description="Generated & shared"
              color="#737373"
              icon={<Analytics />}
              title="Massive Scale"
              details="Handle thousands of dashboards accessed by thousands of users daily."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              number="99.9"
              label="Uptime SLA"
              description="% Guaranteed"
              color="#dc004e"
              icon={<TrendingUp />}
              title="Always Available"
              details="Enterprise-grade reliability ensures your analytics are always accessible."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              label="AI-Ready"
              description="Built-in ML models"
              color="#00897b"
              icon={<SmartToy />}
              title="Predictive Analytics"
              details="Leverage machine learning for forecasting and anomaly detection."
            />
          </Grid>
        </Grid>
      </Container>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
          Ready to Unlock Your Data's Intelligence?
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4, fontSize: '1.08rem' }}>
          Let's discuss how Metis Analytics can transform your data into competitive advantage.
        </Typography>
        <CustomButton variant="contained">Schedule a Demo</CustomButton>
      </Container>
    </>
  );
};

export default MetisAnalytics;
