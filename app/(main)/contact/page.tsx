import { Grid, Box, Typography, Card, CardContent } from '@mui/material';
import { Email, Phone, People, Bolt, EmojiEvents } from '@mui/icons-material';
import Hero from '@/components/hero';
import ContactForm from '@/components/contact-form';
import FeatureCard from '@/components/feature-card';
import PageSection from '@/components/page-section';
import SectionHeading from '@/components/section-heading';
import { accentAt } from '@/lib/brand';

export const metadata = {
  title: 'Contact',
  description:
    'Talk to Metis Analytica about your data infrastructure, analytics, or custodianship needs — we respond within 24 hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Metis Analytica',
    description: 'Start a conversation with our team — we respond within 24 hours.',
    url: '/contact',
  },
};

export default function Contact() {
  const contactInfo = [
    {
      icon: <Email sx={{ fontSize: 28 }} />,
      title: 'Email',
      value: 'info@metisanalytica.com',
      href: 'mailto:info@metisanalytica.com',
    },
    {
      icon: <People sx={{ fontSize: 28 }} />,
      title: 'CEO',
      value: 'Diana Nansereko · 0787364428',
      href: 'tel:0787364428',
    },
    {
      icon: <People sx={{ fontSize: 28 }} />,
      title: 'CMO',
      value: 'Mariam Mugisha · 0773102366',
      href: 'tel:0773102366',
    },
  ];

  return (
    <>
      <Hero
        title="Start a Conversation"
        subtitle="Contact Metis"
        description="Ready to transform your data infrastructure? Let's talk about your data challenges and how we can help."
      />

      <PageSection>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography component="h2" sx={{ fontWeight: 700, fontSize: { xs: '1.35rem', md: '1.75rem' } }}>
                Contact Information
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                Whether you&apos;re exploring data solutions, building from scratch, or scaling existing infrastructure, our team is ready to guide you.
              </Typography>

              {contactInfo.map((info, index) => (
                <Card
                  key={info.title}
                  component="a"
                  href={info.href}
                  sx={{
                    p: 2,
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: 'divider',
                    textDecoration: 'none',
                    color: 'inherit',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
                    '&:hover': {
                      borderColor: accentAt(index),
                      boxShadow: 'var(--shadow-md)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 44,
                          height: 44,
                          borderRadius: '12px',
                          backgroundColor: `${accentAt(index)}20`,
                          color: accentAt(index),
                          flexShrink: 0,
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                          {info.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', wordBreak: 'break-word' }}>
                          {info.value}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              <Card sx={{ p: 2, borderRadius: '12px', bgcolor: 'var(--surface)', boxShadow: 'none' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, fontSize: '0.875rem' }}>
                  Business Hours
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {[
                    ['Monday – Friday', '9:00 AM – 6:00 PM'],
                    ['Saturday', '10:00 AM – 4:00 PM'],
                    ['Sunday', 'Closed'],
                  ].map(([day, hours]) => (
                    <Box key={day} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>{day}</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{hours}</Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, bgcolor: 'var(--surface)', borderRadius: '12px' }}>
              <Typography component="h2" sx={{ fontWeight: 700, mb: 0.5, textAlign: 'center', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                Tell Us About Your Data
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, textAlign: 'center' }}>
                Share your data challenges and business context. We&apos;ll reach out within 24 hours.
              </Typography>
              <ContactForm />
            </Box>
          </Grid>
        </Grid>
      </PageSection>

      <PageSection muted>
        <SectionHeading
          title="Why Organizations Choose Metis"
          description="Trusted by leading organizations for data transformation"
        />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FeatureCard
              icon={<People />}
              title="Growing Community"
              description="Join hundreds of organizations transforming their data infrastructure with Metis."
              color={accentAt(0)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FeatureCard
              icon={<EmojiEvents />}
              title="Enterprise Reliability"
              description="Enterprise-grade infrastructure ensuring your data platform is always available."
              color={accentAt(1)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FeatureCard
              icon={<Phone />}
              title="Expert Support"
              description="Dedicated support team ready to help. We respond within 24 hours to all queries."
              color={accentAt(2)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FeatureCard
              icon={<Bolt />}
              title="Cutting Edge"
              description="Latest investments in AI, security, and analytics keep Metis at the forefront."
              color={accentAt(3)}
            />
          </Grid>
        </Grid>
      </PageSection>
    </>
  );
}
