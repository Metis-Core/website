'use client';

import { FC } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { SecurityOutlined, LockOutlined, VerifiedUser, Assessment } from '@mui/icons-material';
import Hero from '@/components/hero';
import CustomButton from '@/components/button';
import StatsCard from '@/components/stats-card';

const MetisSecurity: FC = () => {
  const features = [
    {
      icon: <LockOutlined sx={{ fontSize: 32 }} />,
      title: 'End-to-End Encryption',
      description: 'Military-grade encryption for data in transit and at rest. Your data is always protected.',
      color: '#dc004e',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 32 }} />,
      title: 'Role-Based Access Control',
      description: 'Define granular permissions down to the field level. Who sees what, is entirely up to you.',
      color: '#737373',
    },
    {
      icon: <Assessment sx={{ fontSize: 32 }} />,
      title: 'Compliance & Audit Trails',
      description: 'Full audit logs of every data access and modification. Meet GDPR, HIPAA, and local compliance standards.',
      color: '#00897b',
    },
    {
      icon: <SecurityOutlined sx={{ fontSize: 32 }} />,
      title: 'Data Residency',
      description: 'Control where your data is stored. Keep data in Uganda, region, or specific cloud regions.',
      color: '#f57c00',
    },
  ];

  const compliance = [
    { standard: 'GDPR', description: 'EU data protection regulation' },
    { standard: 'HIPAA', description: 'Healthcare data security' },
    { standard: 'SOC 2', description: 'Security & availability audits' },
    { standard: 'ISO 27001', description: 'Information security management' },
  ];

  return (
    <>
      {/* Hero */}
      <Hero
        title="Metis Security"
        subtitle="Protection by Design"
        description="Security embedded at every layer. Your data is encrypted, governed, and protected—24/7."
      />

      {/* Overview */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
                Security That's Not an Afterthought
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8, mb: 4, fontSize: '1.08rem' }}>
                Metis Security is embedded into every product, every transaction, every query. It's not a bolt-on compliance layer—it's the foundation.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8, fontSize: '1.08rem' }}>
                Your data is yours. We don't sell it, mine it, or use it. We protect it.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ backgroundColor: '#fff5f8', p: 4, borderRadius: '12px', border: '2px solid #dc004e' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#dc004e', mb: 3 }}>
                Security Pillars
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ pb: 1, borderBottom: '1px solid #f0d0e0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#dc004e', mb: 0.5 }}>
                    🔐 Encryption
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    AES-256 at rest, TLS 1.3 in transit
                  </Typography>
                </Box>
                <Box sx={{ pb: 1, borderBottom: '1px solid #f0d0e0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#dc004e', mb: 0.5 }}>
                    🔑 Access Control
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Field-level RBAC with audit trails
                  </Typography>
                </Box>
                <Box sx={{ pb: 1, borderBottom: '1px solid #f0d0e0' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#dc004e', mb: 0.5 }}>
                    ✓ Compliance
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    GDPR, HIPAA, SOC 2, ISO 27001
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#dc004e', mb: 0.5 }}>
                    📍 Sovereignty
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Data residency in region of your choice
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
            Security Features
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

      {/* Compliance */}
      <Box sx={{ backgroundColor: '#f9f9f9', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
              Compliance Standards
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '1.08rem' }}>
              Metis meets international security and data protection standards
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {compliance.map((item, index) => (
              <Grid size={{ xs: 12, md: 6, lg: 3 }} key={index}>
                <Card sx={{ p: 3, textAlign: 'center', borderRadius: '12px' }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#737373', mb: 1 }}>
                      {item.standard}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Security Stats */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
            Security by the Numbers
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', fontSize: '1.08rem' }}>
            Military-grade protection for your most sensitive data
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              number="256"
              label="Bit Encryption"
              description="Standard"
              color="#dc004e"
              icon={<LockOutlined />}
              title="Military Grade"
              details="AES-256 encryption standard. Used by governments and financial institutions worldwide."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              number="4"
              label="Compliance Standards"
              description="Certified"
              color="#737373"
              icon={<SecurityOutlined />}
              title="Fully Compliant"
              details="GDPR, HIPAA, SOC 2, ISO 27001 certified. Ready for regulated industries."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              label="Zero Trust"
              description="Architecture"
              color="#00897b"
              icon={<VerifiedUser />}
              title="Access Control"
              details="Every access verified. Role-based controls down to field-level granularity."
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatsCard
              label="24/7 Monitoring"
              description="Real-time threat"
              color="#f57c00"
              icon={<Assessment />}
              title="Continuous Defense"
              details="Real-time anomaly detection and threat monitoring protecting your data 24/7."
            />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
          Trust Your Data to Metis Security
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4, fontSize: '1.08rem' }}>
          Let's discuss how we can embed comprehensive security into your data infrastructure.
        </Typography>
        <CustomButton variant="contained">Schedule a Security Review</CustomButton>
      </Container>
    </>
  );
};

export default MetisSecurity;
