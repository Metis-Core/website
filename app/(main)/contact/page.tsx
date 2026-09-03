'use client';

import { FC } from 'react';
import { Container, Grid, Box, Typography, Card, CardContent } from '@mui/material';
import { Email, Phone, LocationOn, People, Bolt, EmojiEvents } from '@mui/icons-material';
import Hero from '@/components/hero';
import ContactForm from '@/components/contact-form';
import FeatureCard from '@/components/feature-card';

const Contact: FC = () => {
  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 28 }} />,
      title: 'Email',
      value: 'hello@metis.com',
      color: '#737373',
    },
    {
      icon: <Phone sx={{ fontSize: 28 }} />,
      title: 'Phone',
      value: '+256 701 234 567',
      color: '#dc004e',
    },
    {
      icon: <LocationOn sx={{ fontSize: 28 }} />,
      title: 'Location',
      value: 'Kampala, Uganda',
      color: '#00897b',
    },
  ];

  return (
    <>
      <Hero
        title="Start a Conversation"
        subtitle="Contact Metis"
        description="Ready to transform your data infrastructure? Let's talk about your data challenges and how we can help."
      />

      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Grid container spacing={6}>
          {/* Contact Cards */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: '#000', mb: 1 }}
              >
                Contact Information
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: '#666', mb: 4, lineHeight: 1.8 }}
              >
                Whether you're exploring data solutions, building from scratch, or scaling existing infrastructure, our team is ready to guide you. Reach out using any method below.
              </Typography>

              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      borderColor: info.color,
                      boxShadow: `0 4px 12px ${info.color}20`,
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          backgroundColor: `${info.color}20`,
                          color: info.color,
                          flexShrink: 0,
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: '#000',
                            mb: 0.25,
                            fontSize: '0.875rem',
                          }}
                        >
                          {info.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#666', fontSize: '0.8rem' }}>
                          {info.value}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              {/* Additional Info */}
              <Card sx={{ p: 2, borderRadius: '12px', backgroundColor: '#f5f5f5', border: 'none' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#000', mb: 1.5, fontSize: '0.875rem' }}>
                  Business Hours
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                      Monday - Friday:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#000', fontSize: '0.75rem' }}>
                      9:00 AM - 6:00 PM
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                      Saturday:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#000', fontSize: '0.75rem' }}>
                      10:00 AM - 4:00 PM
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" sx={{ color: '#666', fontSize: '0.75rem' }}>
                      Sunday:
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#000', fontSize: '0.75rem' }}>
                      Closed
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: '#000', mb: 1, textAlign: 'center' }}
              >
                Tell Us About Your Data
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#666', mb: 4, textAlign: 'center' }}
              >
                Share your data challenges and business context. We'll reach out within 24 hours to discuss next steps.
              </Typography>
              <ContactForm />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Why Partner with Metis Stats */}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 12 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
              Why Organizations Choose Metis
            </Typography>
            <Typography variant="body1" sx={{ color: '#666', fontSize: '1.08rem' }}>
              Trusted by leading organizations for data transformation
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FeatureCard
                icon={<People />}
                title="Growing Community"
                description="Join hundreds of organizations transforming their data infrastructure with Metis."
                color="#737373"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FeatureCard
                icon={<EmojiEvents />}
                title="Enterprise Reliability"
                description="Enterprise-grade infrastructure ensuring your data platform is always available."
                color="#dc004e"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FeatureCard
                icon={<Phone />}
                title="Expert Support"
                description="Dedicated support team ready to help. We respond within 24 hours to all queries."
                color="#00897b"
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <FeatureCard
                icon={<Bolt />}
                title="Cutting Edge"
                description="Latest investments in AI, security, and analytics keep Metis at the forefront."
                color="#f57c00"
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Contact;
