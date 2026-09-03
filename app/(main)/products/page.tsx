'use client';

import { FC } from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Storage, SecurityOutlined, ShareOutlined, Analytics } from '@mui/icons-material';
import Hero from '@/components/hero';
import ProductCard from '@/components/product-card';
import CustomButton from '@/components/button';

const Products: FC = () => {
  const products = [
    {
      id: 'metis-database',
      icon: <Storage sx={{ fontSize: 40 }} />,
      title: 'Metis Database',
      subtitle: 'Enterprise Data Platform',
      description: 'A centralized, sovereign data repository designed for institutions. Metis Database unifies data from multiple sources into a single source of truth.',
      features: [
        'Multi-source data integration',
        'Real-time synchronization',
        'Scalable architecture',
        'Advanced query optimization',
      ],
      color: '#737373',
      link: '/products/metis-database',
    },
    {
      id: 'metis-security',
      icon: <SecurityOutlined sx={{ fontSize: 40 }} />,
      title: 'Metis Security',
      subtitle: 'Data Protection & Governance',
      description: 'Enterprise-grade security framework embedded at every layer. Metis Security ensures your data is protected, compliant, and governed.',
      features: [
        'End-to-end encryption',
        'Role-based access control',
        'Audit trails & compliance',
        'Data residency management',
      ],
      color: '#dc004e',
      link: '/products/metis-security',
    },
    {
      id: 'data-sharing',
      icon: <ShareOutlined sx={{ fontSize: 40 }} />,
      title: 'Metis Data Sharing',
      subtitle: 'Secure Data Collaboration',
      description: 'Enable secure, auditable data sharing across teams and departments. Metis Data Sharing maintains control while enabling collaboration.',
      features: [
        'Granular permission controls',
        'Secure data mesh architecture',
        'Audit-ready collaboration',
        'Cross-organizational sharing',
      ],
      color: '#00897b',
      link: '/products/data-sharing',
    },
    {
      id: 'metis-analytics',
      icon: <Analytics sx={{ fontSize: 40 }} />,
      title: 'Metis Analytics',
      subtitle: 'Intelligence & Insights',
      description: 'Transform raw data into actionable intelligence. Metis Analytics provides real-time dashboards, predictive models, and decision support.',
      features: [
        'Real-time dashboards',
        'Predictive analytics',
        'Custom reporting',
        'AI-powered insights',
      ],
      color: '#f57c00',
      link: '/products/metis-analytics',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Our Products"
        subtitle="Metis Solutions"
        description="Purpose-built products that together form a complete data operating system. Each layer is independently powerful; together they're unstoppable."
      />

      {/* Introduction */}
      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ maxWidth: '900px', mx: 'auto', textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: '#000', mb: 3 }}
          >
            Four Integrated Products, Infinite Possibilities
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#666', lineHeight: 1.8, fontSize: '1.08rem' }}
          >
            Metis products are designed to work together seamlessly. Whether you need a single layer or the complete stack, each product delivers immediate value while integrating with the others.
          </Typography>
        </Box>
      </Container>

      {/* Products Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={product.id}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Integration Section */}
      <Box sx={{ backgroundColor: '#f9f9f9', py: 12, mt: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, color: '#000', mb: 3 }}
            >
              How They Work Together
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: '#666', maxWidth: '700px', mx: 'auto', fontSize: '1.08rem', lineHeight: 1.8 }}
            >
              Metis Database provides the foundation. Metis Security wraps every layer with protection. Metis Data Sharing enables collaboration. Metis Analytics transforms insights into action.
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#737373', mb: 2 }}>
                  🎯 Architecture
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                  Metis Database sits at the core as your centralized data repository. It's designed to scale and integrate with any data source your institution uses.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#dc004e', mb: 2 }}>
                  🔒 Foundation
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                  Every product includes Metis Security. Encryption, access controls, and compliance are built in—not bolted on.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#00897b', mb: 2 }}>
                  👥 Collaboration
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                  Metis Data Sharing lets teams collaborate safely. Share the right data with the right people, with full audit trails.
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#f57c00', mb: 2 }}>
                  📊 Intelligence
                </Typography>
                <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.8 }}>
                  Metis Analytics transforms your unified, secure data into real-time insights and predictive intelligence.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: '#000', mb: 3 }}
        >
          Ready to See Metis in Action?
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#666', mb: 4, fontSize: '1.08rem' }}
        >
          Explore each product in detail or schedule a demo with our team
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <CustomButton variant="contained">Schedule a Demo</CustomButton>
          <CustomButton variant="outlined">Contact Sales</CustomButton>
        </Box>
      </Container>
    </>
  );
};

export default Products;
