import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server';
export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    console.log('middleware called');

    console.log('req.nextauth.token', req.nextauth.token);

    if (req.nextUrl.pathname.startsWith('/admin') && req.nextauth.token?.role !== 'ADMIN') {
      return NextResponse.rewrite(
        new URL("/denied", req.url)
      );
    }
    if (req.nextUrl.pathname.startsWith('/api/admin') && req.nextauth.token?.role !== 'ADMIN') {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (req.nextUrl.pathname.startsWith('/member') && req.nextauth.token?.role !== 'ADMIN' && req.nextauth.token?.role !== 'MEMBER') {
      return NextResponse.rewrite(
        new URL("/denied", req.url)
      );
    }

    if (req.nextUrl.pathname.startsWith('/api/member') && req.nextauth.token?.role !== 'ADMIN' && req.nextauth.token?.role !== 'MEMBER') {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    return NextResponse.next()

  },
  {
    callbacks: {
      authorized: async ({ token, req }) => {
        return !!token;
      }
    }
  }
)

export const config = { matcher: ["/member/:path*", "/api/member/:path*", "/admin/:path*", "/api/admin/:path*"] }