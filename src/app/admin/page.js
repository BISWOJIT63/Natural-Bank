'use client';

import React, { useEffect, useState } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Fetch Admin Data
        fetch('/api/admin')
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setData(res.data);
                }
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#00ff88]">Loading Admin Panel...</div>;

    if (!data) return <div className="min-h-screen bg-[#0a0a0a] text-white p-12">Access Denied or Error</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl font-bold">Admin Portal</h1>
                    <div className="px-4 py-1 bg-red-500/20 text-red-500 rounded-full text-xs font-bold uppercase tracking-widest border border-red-500/50">
                        Admin Access
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <GlassCard>
                        <h3 className="text-white/50 text-sm">Total Users</h3>
                        <div className="text-4xl font-bold">{data.stats.totalUsers}</div>
                    </GlassCard>
                    <GlassCard>
                        <h3 className="text-white/50 text-sm">Active Users</h3>
                        <div className="text-4xl font-bold text-[#00ff88]">{data.stats.activeUsers}</div>
                    </GlassCard>
                    <GlassCard>
                        <h3 className="text-white/50 text-sm">Transaction Volume</h3>
                        <div className="text-4xl font-bold">₹ {data.stats.totalVolume.toLocaleString()}</div>
                    </GlassCard>
                </div>

                {/* User Table */}
                <GlassCard className="mb-8">
                    <h2 className="text-xl font-bold mb-6">User Management</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 text-white/50">
                                    <th className="pb-4">Name</th>
                                    <th className="pb-4">Email</th>
                                    <th className="pb-4">Account ID</th>
                                    <th className="pb-4">Balance</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.users.map(u => (
                                    <tr key={u._id} className="hover:bg-white/5">
                                        <td className="py-4 font-medium">{u.fullName}</td>
                                        <td className="py-4 text-white/70">{u.email}</td>
                                        <td className="py-4 font-mono">{u.accountId}</td>
                                        <td className="py-4">₹ {u.balance?.toLocaleString()}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded text-xs ${u.isActive !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {u.isActive !== false ? 'Active' : 'Suspended'}
                                            </span>
                                        </td>
                                        <td className="py-4">
                                            <button className="text-white/50 hover:text-white underline">Manage</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>

                {/* Recent Global Transactions */}
                <GlassCard>
                    <h2 className="text-xl font-bold mb-6">Global Transactions Monitoring</h2>
                    <div className="space-y-3">
                        {data.stats.transactions.slice(0, 5).map((t, i) => (
                            <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                                <div>
                                    <div className="font-bold text-white/80">{t.description}</div>
                                    <div className="text-xs text-white/40">{new Date(t.createdAt).toLocaleString()}</div>
                                </div>
                                <div className="font-mono">₹ {t.amount.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

            </div>
        </div>
    );
};

export default AdminPage;
