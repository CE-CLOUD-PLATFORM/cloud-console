import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // const url = request.nextUrl.clone();

  // if (url.pathname.startsWith('/auth') || url.pathname.startsWith('/public')) {
  //   console.log("ok");
  //   return NextResponse.next();
  // }
  // const isLoggedIn = false;
  // if (!isLoggedIn) {
  //   url.pathname = '/auth/signin';
  //   return NextResponse.redirect(url);
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
