import { Grid } from '@mui/material';
import Hero from '@/components/hero';
import ProductCard from '@/components/product-card';
import CustomButton from '@/components/button';
import PageSection from '@/components/page-section';
import SectionHeading from '@/components/section-heading';
import CtaBand from '@/components/cta-band';
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
        <CustomButton href="/consultation?type=demo" variant="contained">
          Request a Demo
        </CustomButton>
        <CustomButton href="/contact" variant="outlined">
          Contact Sales
        </CustomButton>
      </Hero>

      <PageSection>
        <SectionHeading
          title={`${products.length} Integrated Products, Infinite Possibilities`}
          description="Metis products are designed to work together seamlessly. Whether you need a single layer or the complete stack, each product delivers immediate value while integrating with the others."
        />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {products.map((product) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={product.id}>
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
      </PageSection>

      <CtaBand
        title="Ready to See Metis in Action?"
        description="Explore each product in detail or schedule a demo with our team."
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
