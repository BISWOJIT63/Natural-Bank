import { serialize } from 'cookie';

export async function POST() {
    const cookie = serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0), // Expire immediately
        path: '/',
    });

    const headers = new Headers();
    headers.set('Set-Cookie', cookie);
    headers.set('Content-Type', 'application/json');

    return new Response(JSON.stringify({ success: true }), { status: 200, headers });
}
