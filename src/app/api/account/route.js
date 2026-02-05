import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { mockUser } from '@/lib/mockData';

const JWT_SECRET = process.env.JWT_SECRET || 'natural-bank-secret-key';

export async function GET(req) {
    // DEMO MODE CHECK
    if (process.env.USE_MOCK_DATA === 'true') {
        return new Response(JSON.stringify({ success: true, data: mockUser }), { status: 200 });
    }

    try {
        await dbConnect();

        // Get token from cookie
        const cookieStore = cookies();
        const token = cookieStore.get('token')?.value;

        if (!token) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
        }

        // Fetch user with account info
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({ success: true, data: user }), { status: 200 });

    } catch (error) {
        console.error('Account API Error:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
