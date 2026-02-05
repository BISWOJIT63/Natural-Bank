'use client';

import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PersonalDetailsForm from '@/components/account-opening/PersonalDetailsForm';
import GlassCard from '@/components/ui/GlassCard';

// Wrap the actual content in Suspense for useSearchParams
const DetailsContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const accountType = searchParams.get('type') || 'savings';

    const handleFormSubmit = async (formData) => {
        // Prepare data payload
        const payload = {
            ...formData,
            accountType
        };

        // For now, assume success and verify in later steps or mock API
        // In real impl, we POST here, but the plan says redirect to processing then POST.
        // To follow the user flow diagram deeply: Form Submit -> Processing Page -> API Call

        // Pass data via query params or (better) sessionStorage/context since it's sensitive.
        // For this demo, we'll simulate "submitting" by saving to session storage
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('accountApplication', JSON.stringify(payload));
        }

        router.push('/account-opening/processing');
    };

    return (
        <div className="max-w-4xl mx-auto px-6 relative z-10">
            <Link href="/account-opening" className="inline-flex items-center gap-2 text-white/60 hover:text-[#00ff88] transition-colors mb-8 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Selection
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
                    Complete Your Application
                </h1>
                <p className="text-white/50">
                    Opening: <span className="text-[#00ff88] font-semibold capitalize">{accountType} Account</span>
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <GlassCard className="p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00ff88]/5 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="mb-8 border-b border-white/10 pb-4">
                            <h2 className="text-xl font-semibold text-white">Personal Information</h2>
                            <p className="text-sm text-white/40">Enter your details as per official documents</p>
                        </div>

                        <PersonalDetailsForm onSubmit={handleFormSubmit} />
                    </div>
                </GlassCard>
            </motion.div>
        </div>
    );
};

const Page = () => {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00ff88]/5 blur-[100px] rounded-full" />
            </div>

            <Suspense fallback={<div className="text-white text-center pt-20">Loading form...</div>}>
                <DetailsContent />
            </Suspense>
        </div>
    );
};

export default Page;
