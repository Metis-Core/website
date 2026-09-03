'use client';

import { FC } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { Storage, CheckCircle, FlashOn, Shield } from '@mui/icons-material';
import Hero from '@/components/hero';
import CustomButton from '@/components/button';
import StatsCard from '@/components/stats-card';

const MerisDatabase: FC = () => {
  const features = [
    {
      icon: <Storage sx={{ fontSize: 32 }} />,
      title: 'Centralized Data Repository',
      description: 'One source of truth for all institutional data. Metis Database consolidates data from multiple systems into a unified, queryable platform.',
      color: '#737373',
    },
    {
      icon: <FlashOn sx={{ fontSize: 32 }} />,
      title: 'Real-time Synchronization',
      description: 'Keep every system in sync. Automatic ETL pipelines ensure data freshness across all integrations without manual intervention.',
      color: '#dc004e',
    },
    {
      icon: <CheckCircle sx={{ fontSize: 32 }} />,
      title: 'Scalable Architecture',
      description: 'Grows with your institution. From terabytes to petabytes, Metis Database scales horizontally without performance degradation.',
      color: '#00897b',
    },
    {
      icon: <Shield sx={{ fontSize: 32 }} />,
      title: 'Built-in Governance',
      description: 'Data lineage, versioning, and audit trails embedded at every layer. Know exactly where your data comes from and who accesses it.',
      color: '#f57c00',
    },
  ];

  const useCases = [
    {
      title: 'Cross-Department Analytics',
      description: 'Integrate HR, Finance, Operations, and Programmatic data into single dashboards for institution-wide visibility.',
    },
    {
      title: 'Real-time Reporting',
      description: 'Replace monthly reports with live dashboards. Decision-makers get current data automatically.',
    },
    {
      title: 'Data Marketplace',
      description: 'Create internal data products. Teams share datasets through Metis Data Sharing with full governance.',
    },
    {
      title: 'Legacy System Migration',
      description: 'Consolidate data from old systems without disrupting operations. Run parallel systems, then transition incrementally.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <Hero
        title="Metis Database"
        subtitle="Your Unified Data Foundation"
        description="The centralized platform where all institutional data lives. Single source of truth. Always current. Fully governed."
      />

      {/* Overview */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
                One Place. All Your Data.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8, mb: 4, fontSize: '1.08rem' }}>
                Metis Database unifies data from your CRM, ERP, HR systems, APIs, and spreadsheets into a single, queryable platform. No more data silos. No more manual exports. Just one source of truth.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8, fontSize: '1.08rem' }}>
                Your team knows exactly where data comes from, who's using it, and how it's changing over time.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ backgroundColor: '#f5f9ff', p: 4, borderRadius: '12px', border: '2px solid #737373' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#737373', mb: 3 }}>
                Key Metrics
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid #e0e0e0' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Query Response Time</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#737373' }}>&lt; 500ms</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid #e0e0e0' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Data Sync Frequency</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#737373' }}>Real-time</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1, borderBottom: '1px solid #e0e0e0' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Uptime SLA</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#737373' }}>99.99%</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" sx={{ color: '#666' }}>Max Dataset Size</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#737373' }}>Petabyte+</Typography>
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
            Core Capabilities
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
              <Card sx={{ p: 3, borderRadius: '12px', border: `2px solid ${feature.color}`, h: '100%' }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', color: feature.color, mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#000', mb: 1, textAlign: 'center' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', textAlign: 'center', lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Use Cases */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
            Common Use Cases
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {useCases.map((useCase, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card sx={{ p: 3, borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                <CardContent sx={{ p: 0 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: '#737373', mb: 2 }}>
                    {useCase.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                    {useCase.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Database Stats */}
      <Box sx={{ backgroundColor: '#f5f9ff', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
              Enterprise-Grade Performance
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '1.08rem' }}>
              Trusted by organizations handling massive-scale data operations
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatsCard
                label="Query Response Time"
                color="#737373"
                icon={<FlashOn />}
                title="Sub-500ms"
                details="Even complex queries on terabyte-scale datasets execute in under 500 milliseconds."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatsCard
                number="99"
                label="Uptime SLA %"
                description=".99%"
                color="#dc004e"
                icon={<CheckCircle />}
                title="Enterprise Reliability"
                details="99.99% uptime guarantee. Your data is always available when you need it."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatsCard
                label="Petabyte Storage"
                description="Supported"
                color="#00897b"
                icon={<Storage />}
                title="Massive Scale"
                details="Store and query petabytes of data. Database grows with your organization."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatsCard
                number="100"
                label="Automatic Backups"
                description="& Replication"
                color="#f57c00"
                icon={<Shield />}
                title="Data Protection"
                details="Automatic backup, replication, and disaster recovery built into every deployment."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ backgroundColor: '#f9f9f9', py: 8 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
            Ready to Unify Your Data?
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', mb: 4, fontSize: '1.08rem' }}>
            Let's discuss how Metis Database can become the foundation of your data strategy.
          </Typography>
          <CustomButton variant="contained">Start a Conversation</CustomButton>
        </Container>
      </Box>
    </>
  );
};

export default MerisDatabase;
