import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();
  
  const origin = request.headers.get('origin') || '*';
  
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type,x-auth-token');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 200,
      headers: response.headers
    });
  }
  
  return response;
}

export const config = {
  matcher: '/:path*'
};