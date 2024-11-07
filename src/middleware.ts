import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const { pathname } = request.nextUrl;
  const isTokenExpire = !token || token === 'undefined';

  if (pathname === '/auth/signin') {
    if (!isTokenExpire) {
      return NextResponse.redirect(new URL('/management/subject', request.url));
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
  matcher: ['/((?!api|_next/static|_next/|asset|favicon.ico).*)'],
};
