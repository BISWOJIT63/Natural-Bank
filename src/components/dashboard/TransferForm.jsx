'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

const TransferForm = ({ onTransfer, userBalance }) => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState(null);

    const handleTransfer = async (e) => {
        e.preventDefault();
        if (!recipient || !amount) return;
        if (parseFloat(amount) > userBalance) {
            setMsg({ type: 'error', text: 'Insufficient funds.' });
            return;
        }

        setLoading(true);
        setMsg(null);

        try {
            // Call API
            const res = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'debit',
                    amount: parseFloat(amount),
                    description: `Transfer to ${recipient}`,
                    cardType: 'debit' // Default to debit for transfers
                })
            });
            const data = await res.json();

            if (data.success) {
                setMsg({ type: 'success', text: 'Transfer successful!' });
                setAmount('');
                setRecipient('');
                if (onTransfer) onTransfer(data.newBalance);
            } else {
                setMsg({ type: 'error', text: data.error || 'Transfer failed' });
            }

        } catch (err) {
            setMsg({ type: 'error', text: 'Server error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlassCard>
            <h3 className="text-xl font-bold mb-6 text-white">Quick Transfer</h3>

            <form onSubmit={handleTransfer} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-wider">Recipient (Email or ID)</label>
                    <input
                        type="text"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00ff88]/50"
                        placeholder="Enter recipient"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-wider">Amount (₹)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00ff88]/50"
                        placeholder="0.00"
                        min="1"
                    />
                </div>

                {msg && (
                    <div className={`text-xs p-2 rounded ${msg.type === 'error' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-[#00ff88]'}`}>
                        {msg.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#00ff88] text-black font-bold py-3 rounded-lg hover:bg-[#00cc6a] transition-colors disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send Money'}
                </button>
            </form>
        </GlassCard>
    );
};

export default TransferForm;
