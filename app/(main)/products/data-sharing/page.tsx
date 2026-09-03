'use client';

import { FC } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { ShareOutlined, Visibility, VerifiedUser, Speed } from '@mui/icons-material';
import Hero from '@/components/hero';
import CustomButton from '@/components/button';
import StatsCard from '@/components/stats-card';

const DataSharing: FC = () => {
  const features = [
    {
      icon: <ShareOutlined sx={{ fontSize: 32 }} />,
      title: 'Granular Permissions',
      description: 'Share exactly what teams need. Define access by user, role, department, or project with field-level precision.',
      color: '#00897b',
    },
    {
      icon: <Visibility sx={{ fontSize: 32 }} />,
      title: 'Transparent Access',
      description: 'Full audit trail of who accessed what, when, and why. Never wonder about data access again.',
      color: '#737373',
    },
    {
      icon: <VerifiedUser sx={{ fontSize: 32 }} />,
      title: 'Secure by Default',
      description: 'Data remains encrypted even when shared. Metis Security protections persist across collaborations.',
      color: '#dc004e',
    },
    {
      icon: <Speed sx={{ fontSize: 32 }} />,
      title: 'Instant Collaboration',
      description: 'Share datasets or create data products instantly. No manual exports, no version confusion.',
      color: '#f57c00',
    },
  ];

  const useCases = [
    {
      title: 'Cross-Department Analytics',
      description: 'Finance, Operations, and HR teams access shared KPIs without exposing sensitive underlying data.',
    },
    {
      title: 'Partner Data Integration',
      description: 'Share program data with partner organizations securely. Maintain audit trails for compliance.',
    },
    {
      title: 'Data Products',
      description: 'Create internal data products and share them organizationally. Developers consume reliable data APIs.',
    },
    {
      title: 'Real-time Dashboards',
      description: 'Multiple teams access live dashboards with different row/column level permissions automatically applied.',
    },
  ];

  return (
    <>
      {/* Hero */}
      <Hero
        title="Metis Data Sharing"
        subtitle="Secure Collaboration"
        description="Enable teams to collaborate on data while maintaining security and control. Share with confidence."
      />

      {/* Overview */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
                Collaboration Without Compromise
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8, mb: 4, fontSize: '1.08rem' }}>
                Metis Data Sharing lets your teams collaborate securely. Share data across departments, with external partners, or internally with fine-grained controls.
              </Typography>
              <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8, fontSize: '1.08rem' }}>
                Every share is auditable. Every access is logged. Every dataset remains governed.
              </Typography>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ backgroundColor: '#f5fff8', p: 4, borderRadius: '12px', border: '2px solid #00897b' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#00897b', mb: 3 }}>
                Collaboration Modes
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ pb: 1, borderBottom: '1px solid #d0f0e8' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#00897b', mb: 0.5 }}>
                    👥 Team Sharing
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Share datasets within your organization
                  </Typography>
                </Box>
                <Box sx={{ pb: 1, borderBottom: '1px solid #d0f0e8' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#00897b', mb: 0.5 }}>
                    🤝 Partner Integration
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Safely share data with external partners
                  </Typography>
                </Box>
                <Box sx={{ pb: 1, borderBottom: '1px solid #d0f0e8' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#00897b', mb: 0.5 }}>
                    📊 Data Products
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Publish curated data for internal consumption
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#00897b', mb: 0.5 }}>
                    🔄 Real-time Sync
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#666' }}>
                    Changes automatically propagate to consumers
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
            Collaboration Features
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

      {/* Stats */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
              Sharing Made Simple
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '1.08rem' }}>
              Key metrics that showcase the power of secure collaboration
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatsCard
                number="150"
                label="Simultaneous Users"
                description="Scale to"
                color="#00897b"
                icon={<ShareOutlined />}
                title="User Capacity"
                details="Support organizations of any size with unlimited concurrent data sharing sessions."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatsCard
                number="100"
                label="Audit Trail Logs"
                description="%"
                color="#737373"
                icon={<Visibility />}
                title="Full Transparency"
                details="Every access is logged and traceable. Complete audit history for compliance."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatsCard
                number="1000"
                label="Datasets Shared Daily"
                color="#dc004e"
                icon={<VerifiedUser />}
                title="Trusted by Teams"
                details="Organizations trust Metis to securely share thousands of datasets daily."
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatsCard
                label="Instant Setup"
                description="Ready to use in"
                color="#f57c00"
                icon={<Speed />}
                title="Quick Deployment"
                details="Start sharing data in minutes, not weeks. No complex configuration needed."
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Use Cases */}
      <Box sx={{ backgroundColor: '#f9f9f9', py: 12 }}>
        <Container maxWidth="lg">
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
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#00897b', mb: 2 }}>
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
      </Box>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
          Ready to Collaborate Securely?
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4, fontSize: '1.08rem' }}>
          Let's discuss how Metis Data Sharing can enable secure collaboration across your organization.
        </Typography>
        <CustomButton variant="contained">Start a Conversation</CustomButton>
      </Container>
    </>
  );
};

export default DataSharing;
