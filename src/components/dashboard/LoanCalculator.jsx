'use client';

import React, { useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';

const LoanCalculator = ({ userBalance = 0 }) => {
    const [loanAmount, setLoanAmount] = useState('');
    const [result, setResult] = useState(null);

    const checkEligibility = (e) => {
        e.preventDefault();
        if (!loanAmount) return;

        // Simple Logic: 
        // - Eligible if loan amount <= 5x balance
        // - Max loan limit 50,00,000

        const amount = parseFloat(loanAmount);
        const maxEligible = userBalance * 5;

        if (amount > 5000000) {
            setResult({ eligible: false, message: 'Loan amount exceeds bank limit (₹50L).' });
        } else if (amount <= maxEligible) {
            setResult({
                eligible: true,
                message: 'Congratulations! You are eligible.',
                rate: '8.5%',
                tenure: '5 Years'
            });
        } else {
            setResult({
                eligible: false,
                message: `Based on your balance, you are eligible for up to ₹${maxEligible.toLocaleString()}.`
            });
        }
    };

    return (
        <GlassCard>
            <h3 className="text-xl font-bold mb-6 text-white">Loan Eligibility</h3>

            <form onSubmit={checkEligibility} className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-white/50 mb-1 uppercase tracking-wider">Desired Loan Amount (₹)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00ff88]/50"
                        placeholder="5,00,000"
                    />
                </div>

                {result && (
                    <div className={`p-4 rounded-lg bg-white/5 border ${result.eligible ? 'border-[#00ff88]/30' : 'border-red-500/30'}`}>
                        <div className={`font-bold mb-1 ${result.eligible ? 'text-[#00ff88]' : 'text-red-400'}`}>
                            {result.eligible ? 'Approved' : 'Not Approved'}
                        </div>
                        <div className="text-sm text-white/70 mb-2">{result.message}</div>

                        {result.eligible && (
                            <div className="flex gap-4 text-xs text-white/50 border-t border-white/10 pt-2 mt-2">
                                <div>Rate: {result.rate}</div>
                                <div>Tenure: {result.tenure}</div>
                            </div>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-white/10 text-white font-bold py-3 rounded-lg hover:bg-white/20 transition-colors"
                >
                    Check Eligibility
                </button>
            </form>
        </GlassCard>
    );
};

export default LoanCalculator;
