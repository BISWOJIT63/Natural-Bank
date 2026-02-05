import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateAccountNumber, generateCardNumber, generateCVV, generateExpiry } from '@/lib/generators';
import { serialize } from 'cookie';
import { mockUser } from '@/lib/mockData';

const JWT_SECRET = process.env.JWT_SECRET || 'natural-bank-secret-key';

export async function POST(req) {
    try {
        const body = await req.json();
        const { fullName, email, password } = body;

        // DEMO MODE CHECK (Allow registration to succeed but return static mock user)
        if (process.env.USE_MOCK_DATA === 'true') {
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

            return new Response(JSON.stringify({
                success: true,
                user: {
                    fullName: fullName, // Reflect back what they typed
                    email: email,
                    accountId: generateAccountNumber()
                }
            }), { status: 201, headers });
        }

        await dbConnect();

        if (!fullName || !email || !password) {
            return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate Banking Data
        const accountId = generateAccountNumber();

        const debitCard = {
            cardNumber: generateCardNumber('debit'),
            cvv: generateCVV(),
            expiryDate: generateExpiry(),
            isActive: true,
            limit: 50000,
            variant: 'gold'
        };

        const creditCard = {
            cardNumber: generateCardNumber('credit'),
            cvv: generateCVV(),
            expiryDate: generateExpiry(),
            isActive: true, // Auto-activate for demo
            limit: 100000,
            availableLimit: 85000,
            variant: 'platinum'
        };

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            accountId,
            balance: 0, // Start with 0
            debitCard,
            creditCard
        });

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
        }), { status: 201, headers });

    } catch (error) {
        console.error('Registration Error:', error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
