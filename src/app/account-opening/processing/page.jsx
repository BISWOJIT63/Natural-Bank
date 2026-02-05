'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProcessingAnimation from '@/components/account-opening/ProcessingAnimation';
import GlassCard from '@/components/ui/GlassCard';

const ProcessingPage = () => {
    const router = useRouter();
    const [apiError, setApiError] = useState(null);

    const handleAnimationComplete = async () => {
        // Animation finished, now actually finalize or redirect
        // In a real app we might have started the API call in background
        // Retrieve data from session
        const dataStr = sessionStorage.getItem('accountApplication');
        if (!dataStr) {
            setApiError("No application data found. Please start over.");
            return;
        }

        const formData = JSON.parse(dataStr);

        try {
            const res = await fetch('/api/account/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await res.json();

            if (res.ok) {
                // Success
                // Clear session
                sessionStorage.removeItem('accountApplication');
                // Store result for success page (or pass via query)
                sessionStorage.setItem('applicationResult', JSON.stringify(result));
                router.push('/account-opening/success');
            } else {
                setApiError(result.message || 'Something went wrong');
            }
        } catch (err) {
            setApiError("Network error. Please try again.");
        }
    };

    if (apiError) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 text-white">
                <GlassCard className="max-w-md w-full text-center p-8 border-red-500/30">
                    <div className="text-4xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold mb-2">Application Failed</h2>
                    <p className="text-red-400 mb-6">{apiError}</p>
                    <button
                        onClick={() => router.push('/account-opening')}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    >
                        Try Again
                    </button>
                </GlassCard>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#0a0a0a] z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00ff88]/5 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-2xl text-center">
                <h1 className="text-3xl font-bold text-white mb-2">Processing Your Application</h1>
                <p className="text-white/50 mb-12">We are setting up your digital banking experience</p>

                <GlassCard className="p-8 md:p-12">
                    <ProcessingAnimation onComplete={handleAnimationComplete} />
                </GlassCard>
            </div>
        </div>
    );
};

export default ProcessingPage;
