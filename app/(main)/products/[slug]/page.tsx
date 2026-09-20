import { notFound } from 'next/navigation';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import Hero from '@/components/hero';
import CustomButton from '@/components/button';
import PageSection from '@/components/page-section';
import CtaBand from '@/components/cta-band';
import { DynamicIcon } from '@/components/dynamic-icon';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Product } from '@/lib/supabase/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('products')
    .select('title')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle<Pick<Product, 'title'>>();

  const title = data?.title ? `${data.title} · Metis Analytica` : 'Products · Metis Analytica';
  return { title };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();

  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle<Product>();

  if (!product) notFound();

  const features = Array.isArray(product.features) ? product.features : [];

  return (
    <>
      <Hero
        title={product.title}
        subtitle={product.subtitle ?? undefined}
        description={product.description}
      >
        <CustomButton href="/consultation?type=demo" variant="contained">
          Request a Demo
        </CustomButton>
        <CustomButton href="/contact" variant="outlined">
          Contact Sales
        </CustomButton>
      </Hero>

      <PageSection>
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Typography
              component="h2"
              sx={{ fontWeight: 800, mb: 3, fontSize: { xs: '1.5rem', md: '2rem' } }}
            >
              Key Features
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {features.map((feature) => (
                <Box
                  key={feature}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'flex-start',
                    px: 2,
                    py: 1.5,
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper',
                  }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: product.color,
                      mt: 0.75,
                      flexShrink: 0,
                    }}
                  />
                  <Typography sx={{ color: 'text.primary', lineHeight: 1.7 }}>
                    {feature}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              sx={{
                borderRadius: '16px',
                border: `2px solid ${product.color}55`,
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: `${product.color}15`,
                      color: product.color,
                      flexShrink: 0,
                    }}
                  >
                    <DynamicIcon name={product.icon} sx={{ fontSize: 26 }} />
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                      {product.subtitle ?? 'Metis Solution'}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Backed by an enterprise-grade stack
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
                  {product.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageSection>

      <CtaBand
        title={`Ready to See ${product.title} in Action?`}
        description={`Explore how ${product.title} fits your data strategy — and how Metis can help you implement it.`}
        actions={
          <>
            <CustomButton href="/consultation?type=demo" variant="contained">
              Schedule a Demo
            </CustomButton>
            <CustomButton href="/contact" variant="outlined">
              Contact Sales
            </CustomButton>
          </>
        }
      />
    </>
  );
}
