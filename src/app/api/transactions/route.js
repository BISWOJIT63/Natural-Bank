import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/Transaction';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { mockTransactions } from '@/lib/mockData';

const JWT_SECRET = process.env.JWT_SECRET || 'natural-bank-secret-key';

async function getAuthUser() {
    await dbConnect();
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded.userId;
    } catch (e) {
        return null;
    }
}

export async function GET(req) {
    if (process.env.USE_MOCK_DATA === 'true') {
        return new Response(JSON.stringify({ success: true, count: mockTransactions.length, data: mockTransactions }), { status: 200 });
    }

    const userId = await getAuthUser();
    if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    try {
        const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 }).limit(20);
        return new Response(JSON.stringify({ success: true, count: transactions.length, data: transactions }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}

export async function POST(req) {
    if (process.env.USE_MOCK_DATA === 'true') {
        // Mock successful transaction
        return new Response(JSON.stringify({ success: true, data: { status: 'completed' }, newBalance: 99999 }), { status: 201 });
    }

    const userId = await getAuthUser();
    if (!userId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    try {
        const body = await req.json();
        const { amount, type, description, cardType } = body;

        // Simple validation
        if (!amount || !type) return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });

        // Update User Balance
        const user = await User.findById(userId);
        if (!user) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

        let newBalance = user.balance;

        if (type === 'debit') {
            if (user.balance < amount) {
                return new Response(JSON.stringify({ error: 'Insufficient funds' }), { status: 400 });
            }
            newBalance -= amount;
        } else if (type === 'credit') {
            // Deposit
            newBalance += amount;
        }

        // Save new balance
        user.balance = newBalance;
        await user.save();

        // Create transaction record
        const txnId = 'TXN' + Math.floor(Date.now() + Math.random());
        const transaction = await Transaction.create({
            userId,
            transactionId: txnId,
            type,
            cardType: cardType || 'debit',
            amount,
            description: description || 'Transfer',
            status: 'completed'
        });

        return new Response(JSON.stringify({ success: true, data: transaction, newBalance }), { status: 201 });

    } catch (error) {
        console.error("Transact Error:", error);
        return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
    }
}
