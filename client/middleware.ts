import { NextRequest, NextResponse } from 'next/server';
import { getServerSideSession } from './lib/api';

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = await getServerSideSession(req);

  if (pathname.startsWith('/auth') && session) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
