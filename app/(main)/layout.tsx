import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getCurrentUserAndProfile } from "@/lib/supabase/queries";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/supabase/types";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await getCurrentUserAndProfile();
  const user = profile
    ? {
        email: profile.email,
        fullName: profile.full_name,
        avatarUrl: profile.avatar_url,
        role: profile.role,
      }
    : null;

  const supabase = await createSupabaseServerClient();
  const { data: productsData } = await supabase
    .from('products')
    .select('slug, title, color, link')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  const products = (productsData ?? []) as Array<Pick<Product, 'slug' | 'title' | 'color' | 'link'>>;
  const productsForNavbar = products.map((p) => ({
    label: p.title,
    href: p.link ?? `/products/${p.slug}`,
    color: p.color,
  }));

  return (
    <>
      <Navbar user={user} products={productsForNavbar} />
      <main className="min-w-0 overflow-x-clip">
        {children}
      </main>
      <Footer />
    </>
  );
}
