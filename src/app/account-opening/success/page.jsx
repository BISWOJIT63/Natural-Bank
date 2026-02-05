'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

const SuccessPage = () => {
    const router = useRouter();
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = sessionStorage.getItem('applicationResult');
            if (data) {
                setResult(JSON.parse(data));
            } else {
                // If no result, maybe redirect home? or just show generic success
            }
        }
    }, []);

    if (!result) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#00ff88]">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 text-center flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[800px] bg-[#00ff88]/5 blur-[150px] rounded-full" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="w-24 h-24 bg-[#00ff88]/20 text-[#00ff88] rounded-full mx-auto flex items-center justify-center text-5xl mb-6 ring-4 ring-[#00ff88]/10"
                    >
                        ✓
                    </motion.div>
                    <h1 className="text-4xl font-bold mb-4">Application Submitted!</h1>
                    <p className="text-white/60 text-lg">Thank you for choosing Natural Bank.</p>
                </div>

                <GlassCard className="p-8 md:p-12 border-[#00ff88]/20 shadow-[0_0_50px_rgba(0,255,136,0.1)]">
                    <div className="text-center border-b border-white/10 pb-8 mb-8">
                        <p className="text-white/50 mb-2 uppercase tracking-wide text-xs">Application Reference Number</p>
                        <div className="text-3xl md:text-4xl font-mono text-[#00ff88] font-bold tracking-wider">
                            {result.applicationId || 'REF-PENDING'}
                        </div>
                    </div>

                    <div className="space-y-6 mb-8 text-center md:text-left">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <span className="text-xl"><i className="ri-mail-fill"></i></span> What Happens Next?
                            </h3>
                            <ul className="space-y-4 text-sm text-white/70">
                                <li className="flex gap-3">
                                    <span className="bg-white/10 w-6 h-6 rounded-full flex items-center justify-center text-xs text-[#00ff88]">1</span>
                                    <span>
                                        <strong>Verification (24-48 hours):</strong> Our team will verify your documents against government databases.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-white/10 w-6 h-6 rounded-full flex items-center justify-center text-xs text-[#00ff88]">2</span>
                                    <span>
                                        <strong>Approval Email:</strong> Once approved, you'll receive your account number and credentials via email.
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="bg-white/10 w-6 h-6 rounded-full flex items-center justify-center text-xs text-[#00ff88]">3</span>
                                    <span>
                                        <strong>Welcome Kit:</strong> Your debit card and welcome kit will be dispatched to your registered address.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="text-center text-sm text-white/40">
                            A confirmation email has been sent to your registered email address.
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link href="/" className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium transition-colors text-center">
                            Back to Home
                        </Link>
                        <button className="px-8 py-3 bg-[#00ff88]/20 text-[#00ff88] hover:bg-[#00ff88]/30 border border-[#00ff88]/30 rounded-xl font-medium transition-colors">
                            Track Application
                        </button>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default SuccessPage;
