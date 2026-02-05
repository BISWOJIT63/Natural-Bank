import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { mockUser } from '@/lib/mockData';

const JWT_SECRET = process.env.JWT_SECRET || 'natural-bank-secret-key';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        // DEMO MODE CHECK
        if (process.env.USE_MOCK_DATA === 'true') {
            // Simple mock login check
            if (email === mockUser.email && password === mockUser.password) {
                const token = jwt.sign({ userId: mockUser._id, email: mockUser.email }, JWT_SECRET, { expiresIn: '1d' });
                const cookie = serialize('token', token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24, // 1 day
                    path: '/',
                });
                const headers = new Headers();
                headers.set('Set-Cookie', cookie);
                headers.set('Content-Type', 'application/json');

                return new Response(JSON.stringify({ success: true, user: mockUser }), { status: 200, headers });
            } else {
                return new Response(JSON.stringify({ error: 'Invalid credentials (Mock: demo@naturalbank.com / password)' }), { status: 401 });
            }
        }

        await dbConnect();

        if (!email || !password) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }

        // Create Token
        const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

        // Set Cookie
        const cookie = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        const headers = new Headers();
        headers.set('Set-Cookie', cookie);
        headers.set('Content-Type', 'application/json');

        return new Response(JSON.stringify({
            success: true,
            user: {
                fullName: user.fullName,
                email: user.email,
                accountId: user.accountId
            }
        }), { status: 200, headers });

    } catch (error) {
        console.error('Login Error:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
