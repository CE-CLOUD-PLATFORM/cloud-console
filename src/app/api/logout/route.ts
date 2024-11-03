import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const redirectUrl = `${req.nextUrl.protocol}//${req.nextUrl.host}/auth/signin`;

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
  });

  response.cookies.set("user", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
