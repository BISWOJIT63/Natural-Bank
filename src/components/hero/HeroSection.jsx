'use client';

import React, { useState } from 'react';
import ImageSequenceCanvas from './ImageSequenceCanvas';
import useScrollSequence from '@/hooks/useScrollSequence';
import FramePreloader from '@/components/preloader/FramePreloader';
import useFramePreloader from '@/hooks/useFramePreloader';
import DebitCard3D from '@/components/cards/DebitCard3D';
import CreditCard3D from '@/components/cards/CreditCard3D';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const TOTAL_FRAMES = 100;

const HeroSection = () => {
    const [activeCard, setActiveCard] = useState('debit');

    const sequences = {
        debit: { path: '/sequences/debit', count: TOTAL_FRAMES },
        credit: { path: '/sequences/credit', count: TOTAL_FRAMES }
    };

    const { progress, isLoaded } = useFramePreloader(sequences);
    const currentFrame = useScrollSequence(TOTAL_FRAMES);

    return (
        <>
            <FramePreloader progress={progress} isLoaded={isLoaded} />

            <div className="relative z-10 h-[200vh] w-full">

                <div className="sticky top-0 h-screen w-full overflow-hidden">

                    <ImageSequenceCanvas currentFrame={currentFrame} folder={activeCard} />
                    <div className="absolute inset-0 hero-overlay pointer-events-none z-0" />
                    <div className="absolute inset-0 flex items-center justify-center lg:justify-start px-12 lg:px-24 z-10">

                        {/* Centered/Left Text Content */}
                        <div className="w-full lg:w-2/3 text-white space-y-8 z-20 text-center lg:text-left">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={activeCard}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <h1 className="text-6xl lg:text-9xl font-bold tracking-tighter leading-none mb-4 mix-blend-overlay">
                                        {activeCard === 'debit' ? 'NATURAL DEBIT CARD' : 'NATURAL CREDIT CARD'}
                                    </h1>
                                    <p className="text-xl lg:text-3xl font-light opacity-90 glass p-8 rounded-3xl max-w-xl backdrop-blur-md border-white/20 mx-auto lg:mx-0">
                                        {activeCard === 'debit'
                                            ? "Experience the future of banking. Where your money floats above the noise."
                                            : "Unlock potential with zero limits. The credit card that defies gravity."}
                                    </p>
                                </motion.div>
                            </AnimatePresence>

                            {/* Switcher Controls */}
                            <div className="flex gap-6 mt-12 justify-center lg:justify-start">
                                <button
                                    onClick={() => setActiveCard('debit')}
                                    className={`px-10 py-4 rounded-full border border-white/30 text-lg font-semibold tracking-wide transition-all duration-300 ${activeCard === 'debit' ? 'bg-[#00ff88] text-black border-[#00ff88] scale-105 shadow-[0_0_30px_rgba(0,255,136,0.3)]' : 'hover:bg-white/10 text-white'}`}
                                >
                                    DEBIT
                                </button>
                                <button
                                    onClick={() => setActiveCard('credit')}
                                    className={`px-10 py-4 rounded-full border border-white/30 text-lg font-semibold tracking-wide transition-all duration-300 ${activeCard === 'credit' ? 'bg-cyan-400 text-black border-cyan-400 scale-105 shadow-[0_0_30px_rgba(34,211,238,0.3)]' : 'hover:bg-white/10 text-white'}`}
                                >
                                    CREDIT
                                </button>
                            </div>
                        </div>

                        {/* Right Text Content (CTA) */}
                        <div className="hidden lg:flex flex-col items-end justify-center w-1/3 text-right z-20 gap-6 mt-20">
                            <Link
                                href="/dashboard"
                                className="group relative px-8 py-4 bg-[#00ff88] text-black font-bold rounded-full text-lg shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:shadow-[0_0_40px_rgba(0,255,136,0.6)] hover:scale-105 transition-all duration-300"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Open Bank Account <span><i className="ri-emotion-happy-fill"></i></span>
                                </span>
                            </Link>

                            <Link
                                href="/login"
                                className="group flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-medium backdrop-blur-sm bg-black/20 px-6 py-3 rounded-full border border-white/10 hover:border-white/30"
                            >
                                <span>I have already an account</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Highlights Section (Integrated here or separate?) */}
            {/* Requirement says "3 Random Card Features with Highlight Lines" shown with card? 
            Or maybe below? 
            Visual example showed:
            [Card]
            [Line]
            [Feature 1]
            It seems it's part of the card display area. 
        */}

            <div className="min-h-screen bg-[#051a10]/95 backdrop-blur-xl text-white flex flex-col items-center justify-center relative z-20 py-24 border-t border-[#00ff88]/10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 px-6"
                >
                    <h2 id="banking-upgraded-title" className="text-5xl lg:text-7xl font-bold mb-6 text-[#00ff88]">Banking, Upgraded.</h2>
                    <p className="text-xl text-white/50 max-w-2xl mx-auto">Access the features you need, faster than ever before.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-6">
                    <Link href="/register" className="group">
                        <div className="glass p-8 rounded-3xl h-full hover:bg-[#00ff88]/20 transition-all duration-500 border-black/10 dark:border-white/10 group-hover:border-[#00ff88]/50 group-hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                            <div className="text-4xl mb-6"><i className="ri-emotion-add-fill"></i></div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-[#00ff88] transition-colors">Create Account</h3>
                            <p className="text-gray-600 dark:text-white/50">Join thousands of users enjoying fee-free premium banking. Sign up in seconds.</p>
                        </div>
                    </Link>

                    <Link href="/transfer" className="group">
                        <div className="glass p-8 rounded-3xl h-full hover:bg-[#00ff88]/20 transition-all duration-500 border-black/10 dark:border-white/10 group-hover:border-[#00ff88]/50 group-hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                            <div className="text-4xl mb-6"><i className="ri-exchange-funds-fill"></i></div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-[#00ff88] transition-colors">Instant Transfer</h3>
                            <p className="text-gray-600 dark:text-white/50">Send money globally with zero markup fees. Your funds, where you need them.</p>
                        </div>
                    </Link>

                    <Link href="/login" className="group">
                        <div className="glass p-8 rounded-3xl h-full hover:bg-[#00ff88]/20 transition-all duration-500 border-black/10 dark:border-white/10 group-hover:border-[#00ff88]/50 group-hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]">
                            <div className="text-4xl mb-6"><i className="ri-secure-payment-fill"></i></div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-[#00ff88] transition-colors">Secure Login</h3>
                            <p className="text-gray-600 dark:text-white/50">Access your dashboard with biometric security and real-time alerts.</p>
                        </div>
                    </Link>

                    {/* New Features */}
                    <div className="glass p-8 rounded-3xl h-full hover:bg-[#00ff88]/20 transition-all duration-500 border-black/10 dark:border-white/10 hover:border-[#00ff88]/50 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] group cursor-pointer">
                        <div className="text-4xl mb-6"><i className="ri-smartphone-fill"></i></div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-[#00ff88] transition-colors">Recharge & DTH</h3>
                        <p className="text-gray-600 dark:text-white/50">Instant mobile recharges and DTH payments with zero processing fees.</p>
                    </div>

                    <div className="glass p-8 rounded-3xl h-full hover:bg-[#00ff88]/20 transition-all duration-500 border-black/10 dark:border-white/10 hover:border-[#00ff88]/50 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] group cursor-pointer">
                        <div className="text-4xl mb-6"><i className="ri-bank-card-fill"></i></div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-[#00ff88] transition-colors">Pay EMIs</h3>
                        <p className="text-gray-600 dark:text-white/50">Never miss a payment. Automate your EMI payments securely.</p>
                    </div>

                    <div className="glass p-8 rounded-3xl h-full hover:bg-[#00ff88]/20 transition-all duration-500 border-black/10 dark:border-white/10 hover:border-[#00ff88]/50 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)] group cursor-pointer">
                        <div className="text-4xl mb-6"><i className="ri-shield-user-fill"></i></div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-[#00ff88] transition-colors">Insurance</h3>
                        <p className="text-gray-600 dark:text-white/50">Protect what matters most. Instant policy issuance and easy claims.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSection;
