'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import AccountTypeCard from '@/components/account-opening/AccountTypeCard';
import { accountTypes } from '@/config/accountTypes';

const AccountOpeningPage = () => {
    const router = useRouter();

    const handleSelect = (typeId) => {
        router.push(`/account-opening/details?type=${typeId}`);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00ff88]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-[#00ff88] transition-colors mb-8 group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        Choose Your Account Type
                    </h1>
                    <p className="text-xl text-white/40 max-w-2xl mx-auto">
                        Select the account that fits your financial gravity. Both come with our signature features.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <AccountTypeCard type={accountTypes.savings} onSelect={handleSelect} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <AccountTypeCard type={accountTypes.current} onSelect={handleSelect} />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AccountOpeningPage;
