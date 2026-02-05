'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import DebitCard3D from '@/components/cards/DebitCard3D';
import CreditCard3D from '@/components/cards/CreditCard3D';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TransferForm from '@/components/dashboard/TransferForm';
import LoanCalculator from '@/components/dashboard/LoanCalculator';
import StatementGenerator from '@/components/dashboard/StatementGenerator';

const QuickActionsGrid = () => {
    const [showAll, setShowAll] = useState(false);

    const actions = [
        { icon: <i className="ri-exchange-funds-line"></i>, label: 'Transfer', href: '/transfer' },
        { icon: <i className="ri-bill-line"></i>, label: 'Pay Bills' },
        { icon: <i className="ri-bar-chart-box-line"></i>, label: 'Invest' },
        { icon: <i className="ri-smartphone-line"></i>, label: 'Recharge' },
        { icon: <i className="ri-radar-fill"></i>, label: 'DTH' },
        { icon: <i className="ri-bank-card-line"></i>, label: 'Pay EMIs' },
    ];

    const displayedActions = showAll ? actions : actions.slice(0, 4);

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                {displayedActions.map((action, index) => (
                    action.href ? (
                        <Link
                            key={index}
                            href={action.href}
                            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center gap-2 group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">{action.icon}</span>
                            <span className="text-xs text-center">{action.label}</span>
                        </Link>
                    ) : (
                        <button
                            key={index}
                            className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex flex-col items-center gap-2 group"
                        >
                            <span className="text-xl group-hover:scale-110 transition-transform">{action.icon}</span>
                            <span className="text-xs text-center">{action.label}</span>
                        </button>
                    )
                ))}
            </div>
            {actions.length > 4 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full py-2 text-xs font-medium text-[#00ff88] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                    {showAll ? 'Show Less' : 'Show More'}
                    <span className={`transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`}>▼</span>
                </button>
            )}
        </div>
    );
};

const DashboardPage = () => {
    const { user, loading, logout } = useAuth();
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    // Feature: Show/Hide Card Details
    const [showDebit, setShowDebit] = useState(false);
    const [showCredit, setShowCredit] = useState(false);

    const router = useRouter();

    const [showBalancePinModal, setShowBalancePinModal] = useState(false);
    const [balancePin, setBalancePin] = useState('');
    const [balanceError, setBalanceError] = useState('');
    const [isBalanceVisible, setIsBalanceVisible] = useState(false);

    const handleBalanceClick = () => {
        if (isBalanceVisible) {
            setIsBalanceVisible(false);
        } else {
            setShowBalancePinModal(true);
            setBalancePin('');
            setBalanceError('');
        }
    };

    const verifyBalancePin = () => {
        if (balancePin === '1234') {
            setIsBalanceVisible(true);
            setShowBalancePinModal(false);
        } else {
            setBalanceError('Invalid PIN');
            setBalancePin('');
        }
    };

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            setBalance(user.balance);
            // Fetch transactions for statement
            fetch('/api/transactions')
                .then(res => res.json())
                .then(data => {
                    if (data.success) setTransactions(data.data);
                });
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#00ff88]">Loading Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Welcome, {user.fullName.split(' ')[0]}</h1>
                        <p className="text-white/50">Account ID: {user.accountId}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard/profile" className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                            Profile
                        </Link>
                        <button onClick={logout} className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20">
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Balance & Stats */}
                    <div className="space-y-8">
                        <GlassCard className="bg-gradient-to-br from-[#00ff88]/10 to-transparent relative overflow-hidden group">
                            <h3 className="text-sm font-medium opacity-70 mb-1">TOTAL BALANCE</h3>
                            <div className="flex items-center gap-4">
                                <div className="text-5xl font-bold tracking-tight">
                                    {isBalanceVisible ? `₹ ${balance.toLocaleString()}` : '₹ •••••••'}
                                </div>
                                <button
                                    onClick={handleBalanceClick}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                >
                                    {isBalanceVisible ? <i className="ri-eye-off-line"></i> : <i className="ri-eye-line"></i>}
                                </button>
                            </div>
                            <div className="mt-4 flex gap-2 text-sm text-[#00ff88] bg-[#00ff88]/10 w-fit px-3 py-1 rounded-full">
                                ↑ +2.4% this month
                            </div>
                        </GlassCard>

                        {/* PIN Modal */}
                        {showBalancePinModal && (
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                                onClick={() => setShowBalancePinModal(false)}
                            >
                                <div
                                    className="bg-[#111] border border-[#00ff88]/30 p-8 rounded-3xl w-full max-w-sm text-center shadow-[0_0_50px_rgba(0,255,136,0.2)]"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <h3 className="text-2xl font-bold text-white mb-6">Enter Security PIN</h3>
                                    <div className="flex justify-center mb-6">
                                        <input
                                            type="password"
                                            value={balancePin}
                                            onChange={(e) => setBalancePin(e.target.value)}
                                            maxLength={4}
                                            className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-center text-3xl tracking-[1em] w-48 text-white focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88]"
                                            autoFocus
                                        />
                                    </div>
                                    {balanceError && <p className="text-red-500 mb-4 font-medium animate-pulse">{balanceError}</p>}
                                    <button
                                        onClick={verifyBalancePin}
                                        className="w-full py-3 bg-[#00ff88] text-black font-bold rounded-xl hover:bg-[#00ff88]/90 transition-colors"
                                    >
                                        Verify Access
                                    </button>
                                </div>
                            </div>
                        )}

                        <GlassCard>
                            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                            <QuickActionsGrid />
                            <div className="mt-6 flex justify-center border-t border-white/5 pt-4">
                                <StatementGenerator
                                    transactions={transactions}
                                    userName={user.fullName}
                                    accountId={user.accountId}
                                />
                            </div>
                        </GlassCard>

                        {/* Loan Calculator Widget */}
                        <LoanCalculator userBalance={balance} />
                    </div>

                    {/* Center/Right Column: Cards & Features */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Cards Row */}
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold mb-6">Your Cards</h2>
                                <div className="flex flex-wrap gap-8 justify-center lg:justify-start">

                                    {/* Debit Card */}
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="scale-90 lg:scale-100 origin-top-left">
                                            <DebitCard3D
                                                cardNumber={user.debitCard?.cardNumber}
                                                holder={user.fullName}
                                                expiry={user.debitCard?.expiryDate}
                                                showDetails={showDebit}
                                            />
                                        </div>
                                        <button
                                            onClick={() => setShowDebit(!showDebit)}
                                            className="text-xs text-[#00ff88] hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-[#00ff88]/50"
                                        >
                                            {showDebit ? 'Hide Details' : 'Show Card Details'}
                                        </button>
                                    </div>

                                    {/* Credit Card */}
                                    {user.creditCard?.isActive && (
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="scale-90 lg:scale-100 origin-top-left">
                                                <CreditCard3D
                                                    cardNumber={user.creditCard?.cardNumber}
                                                    holder={user.fullName}
                                                    expiry={user.creditCard?.expiryDate}
                                                    showDetails={showCredit}
                                                />
                                            </div>
                                            <button
                                                onClick={() => setShowCredit(!showCredit)}
                                                className="text-xs text-cyan-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/5 hover:border-cyan-400/50"
                                            >
                                                {showCredit ? 'Hide Details' : 'Show Card Details'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Transfer Widget (Quick) */}
                            <div className="flex-1">
                                <TransferForm userBalance={balance} onTransfer={(newBal) => setBalance(newBal)} />
                            </div>
                        </div>

                        {/* Recent Transactions Mock */}
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
                            <div className="space-y-4">
                                {transactions.slice(0, 5).map((txn, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                🛍️
                                            </div>
                                            <div>
                                                <div className="font-medium">{txn.description}</div>
                                                <div className="text-xs text-white/50">{new Date(txn.createdAt).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                        <div className={`font-mono ${txn.type === 'credit' ? 'text-[#00ff88]' : 'text-white/90'}`}>
                                            {txn.type === 'debit' ? '-' : '+'} ₹ {txn.amount.toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
