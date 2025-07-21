import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { method, url } = request;
  // Log method and URL to stdout
  console.log(`[Next.js Middleware] ${method} ${url}`);
  return NextResponse.next();
}

// Match all routes
export const config = {
  matcher: '/:path*',
};
