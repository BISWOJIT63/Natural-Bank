import { mockAllUsers, mockAllTransactions } from '@/lib/mockData';

export async function GET() {
    if (process.env.USE_MOCK_DATA === 'true') {
        const stats = {
            totalUsers: mockAllUsers.length,
            totalVolume: mockAllTransactions.reduce((acc, t) => acc + t.amount, 0),
            activeUsers: mockAllUsers.filter(u => u.isActive).length,
            transactions: mockAllTransactions
        };
        return new Response(JSON.stringify({ success: true, data: { users: mockAllUsers, stats } }), { status: 200 });
    }
    // Implement real DB logic here if needed later
    return new Response(JSON.stringify({ error: 'Not implemented for DB mode yet' }), { status: 501 });
}
