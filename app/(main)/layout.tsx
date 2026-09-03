import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getCurrentUserAndProfile } from "@/lib/supabase/queries";

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

  return (
    <>
      <Navbar user={user} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
