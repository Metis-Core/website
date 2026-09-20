export function hasOverlayHero(pathname: string): boolean {
  if (pathname === '/') return true;
  if (
    pathname === '/about' ||
    pathname === '/services' ||
    pathname === '/contact' ||
    pathname === '/consultation' ||
    pathname === '/feedback' ||
    pathname === '/careers' ||
    pathname === '/products'
  ) {
    return true;
  }
  if (pathname.startsWith('/products/')) return true;
  return false;
}
