import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const response = NextResponse.next();

  const { pathname } = request.nextUrl;
  const isTokenExpire = !token || token === 'undefined';

  if (pathname === '/auth/signin') {
    if (!isTokenExpire) {
      return NextResponse.redirect(new URL('/management/subject', request.url));
    } else {
      response.cookies.delete('token');
    }
    return NextResponse.next();
  } else {
    if (isTokenExpire) {
      response.cookies.delete('token');
      return NextResponse.redirect(new URL('/auth/signin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/|asset|favicon.ico).*)'],
};
