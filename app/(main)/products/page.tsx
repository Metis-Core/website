import Link from 'next/link';
import { Box, Container, Grid, Typography } from '@mui/material';
import Hero from '@/components/hero';
import ProductCard from '@/components/product-card';
import CustomButton from '@/components/button';
import { DynamicIcon } from '@/components/dynamic-icon';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Product } from '@/lib/supabase/types';

export const metadata = { title: 'Products · Metis Analytica' };

export default async function Products() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  const products = (data ?? []) as Product[];

  return (
    <>
      <Hero
        title="Our Products"
        subtitle="Metis Solutions"
        description="Purpose-built products that together form a complete data operating system. Each layer is independently powerful; together they're unstoppable."
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <CustomButton href="/consultation?type=demo" variant="contained">
            Request a Demo
          </CustomButton>
          <CustomButton href="/contact" variant="outlined">
            Contact Sales
          </CustomButton>
        </Box>
      </Hero>

      <Container maxWidth="lg" sx={{ py: 12 }}>
        <Box sx={{ maxWidth: '900px', mx: 'auto', textAlign: 'center', mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
            {products.length} Integrated Products, Infinite Possibilities
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', lineHeight: 1.8, fontSize: '1.08rem' }}>
            Metis products are designed to work together seamlessly. Whether you need a single layer or the complete stack, each product delivers immediate value while integrating with the others.
          </Typography>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid size={{ xs: 12, md: 6, lg: 3 }} key={product.id}>
              <ProductCard
                id={product.id}
                icon={<DynamicIcon name={product.icon} sx={{ fontSize: 40 }} />}
                title={product.title}
                subtitle={product.subtitle ?? ''}
                description={product.description}
                features={product.features}
                color={product.color}
                link={product.link ?? `/products/${product.slug}`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth="lg" sx={{ py: 12, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 700, color: '#000', mb: 3 }}>
          Ready to See Metis in Action?
        </Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 4, fontSize: '1.08rem' }}>
          Explore each product in detail or schedule a demo with our team.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <CustomButton href="/consultation?type=demo" variant="contained">
            Schedule a Demo
          </CustomButton>
          <CustomButton href="/contact" variant="outlined">
            Contact Sales
          </CustomButton>
        </Box>
      </Container>
    </>
  );
}
