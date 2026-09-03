import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const AUTH_ROUTES = ['/login', '/register', '/forgot-password'];
const PROTECTED_PREFIXES = ['/account', '/admin'];
const ADMIN_PREFIX = '/admin';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  if (!user && PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = '';
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  if (user && AUTH_ROUTES.includes(pathname)) {
    const nextParam = request.nextUrl.searchParams.get('next');
    const url = request.nextUrl.clone();
    url.search = '';
    url.pathname = nextParam && nextParam.startsWith('/') && !nextParam.startsWith('//') ? nextParam : '/account';
    return NextResponse.redirect(url);
  }

  if (user && pathname.startsWith(ADMIN_PREFIX)) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profile?.role !== 'admin') {
      const url = request.nextUrl.clone();
      url.pathname = '/account';
      return NextResponse.redirect(url);
    }
  }

  return response;
}
