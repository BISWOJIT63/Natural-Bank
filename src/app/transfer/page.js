'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';

const TransferPage = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [msg, setMsg] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    if (loading || !user) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">Loading...</div>;

    const handleTransfer = async (e) => {
        e.preventDefault();
        setIsProcessing(true);
        setMsg(null);

        try {
            const res = await fetch('/api/transactions', {
                method: 'POST',
                body: JSON.stringify({
                    type: 'debit',
                    amount: parseFloat(amount),
                    description: `Transfer to ${recipient}`,
                    cardType: 'debit'
                })
            });
            const data = await res.json();

            if (data.success) {
                setMsg({ type: 'success', text: `Successfully sent ₹${amount} to ${recipient}` });
                setAmount('');
                setRecipient('');
            } else {
                setMsg({ type: 'error', text: data.error });
            }
        } catch (err) {
            setMsg({ type: 'error', text: 'Transfer failed.' });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-12 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Fund Transfer</h1>
                    <Link href="/dashboard" className="text-sm text-[#00ff88] hover:underline">← Back to Dashboard</Link>
                </div>

                <GlassCard>
                    <div className="flex items-center gap-4 mb-8 bg-white/5 p-4 rounded-xl">
                        <div className="text-sm text-white/50">Current Balance</div>
                        <div className="text-2xl font-bold">₹ {user.balance.toLocaleString()}</div>
                    </div>

                    <form onSubmit={handleTransfer} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Recipient Account / Email</label>
                            <input
                                type="text"
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-lg focus:border-[#00ff88] outline-none transition-colors"
                                placeholder="username@naturalbank.com"
                                value={recipient}
                                onChange={e => setRecipient(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Amount (INR)</label>
                            <input
                                type="number"
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-3xl font-mono focus:border-[#00ff88] outline-none transition-colors"
                                placeholder="0.00"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                min="1"
                                required
                            />
                        </div>

                        {msg && (
                            <div className={`p-4 rounded-xl ${msg.type === 'success' ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-red-500/20 text-red-500'}`}>
                                {msg.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isProcessing}
                            className="w-full bg-[#00ff88] text-black font-bold text-lg py-4 rounded-xl hover:bg-[#00cc6a] transition-all disabled:opacity-50"
                        >
                            {isProcessing ? 'Processing Transaction...' : 'Confirm Transfer'}
                        </button>
                    </form>
                </GlassCard>
            </div>
        </div>
    );
};

export default TransferPage;
