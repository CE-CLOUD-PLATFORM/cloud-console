import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/'];
const authPaths = ['/auth/signin'];

export function middleware(request: NextRequest) {

  const token = request.cookies.get('token')?.value;

  const shouldProtect = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));
  const pathname = request.nextUrl.pathname;
  const isTokenExpire = (!token || token === "undefined")

  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path));
  if (pathname === '/auth/signin') {
    if (!isTokenExpire) {
      return NextResponse.redirect(new URL('/', request.url));

    }
    return NextResponse.next();
  } else {
    if (isTokenExpire) {
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // matcher: ['/:path*'],
  matcher: ['/((?!api|_next/static|_next/|asset|favicon.ico).*)'],
};