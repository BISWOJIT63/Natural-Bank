'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import Link from 'next/link';

const ProfilePage = () => {
    const { user, loading } = useAuth();

    if (loading || !user) {
        return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#00ff88]">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Account Settings</h1>
                    <Link href="/dashboard" className="text-sm text-[#00ff88] hover:underline">← Back to Dashboard</Link>
                </div>

                <div className="grid gap-6">
                    {/* Personal Info */}
                    <GlassCard>
                        <h2 className="text-xl font-bold mb-6">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm text-white/50 mb-1">Full Name</label>
                                <div className="text-lg">{user.fullName}</div>
                            </div>
                            <div>
                                <label className="block text-sm text-white/50 mb-1">Email Address</label>
                                <div className="text-lg">{user.email}</div>
                            </div>
                            <div>
                                <label className="block text-sm text-white/50 mb-1">Phone Number</label>
                                <div className="text-lg">{user.phone || '+91 98765 43210'}</div>
                            </div>
                            <div>
                                <label className="block text-sm text-white/50 mb-1">Account ID</label>
                                <div className="text-lg font-mono">{user.accountId}</div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm">Edit Details</button>
                        </div>
                    </GlassCard>

                    {/* Security */}
                    <GlassCard>
                        <h2 className="text-xl font-bold mb-6">Security</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                    <div className="font-semibold">Password</div>
                                    <div className="text-sm text-white/50">Last changed 3 months ago</div>
                                </div>
                                <button className="text-[#00ff88] hover:underline text-sm">Change</button>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                                <div>
                                    <div className="font-semibold">Two-Factor Authentication</div>
                                    <div className="text-sm text-white/50">Disabled</div>
                                </div>
                                <button className="text-[#00ff88] hover:underline text-sm">Enable</button>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
