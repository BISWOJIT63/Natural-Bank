'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, Globe, Smartphone, Clock, CreditCard } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const features = [
    {
        icon: <Wallet className="w-8 h-8 text-[#00ff88]" />,
        title: "Instant Accounts",
        description: "Open a new account in less than 3 minutes. No paperwork, just gravity."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-[#00ff88]" />,
        title: "Vault Security",
        description: "Biometric encryption and AI fraud detection keep your assets floating safely."
    },
    {
        icon: <Globe className="w-8 h-8 text-[#00ff88]" />,
        title: "Global Access",
        description: "Spend anywhere in the universe with zero forex markup on Premium plans."
    },
    {
        icon: <Smartphone className="w-8 h-8 text-[#00ff88]" />,
        title: "Mobile First",
        description: "Full banking control from our award-winning native mobile application."
    },
    {
        icon: <Clock className="w-8 h-8 text-[#00ff88]" />,
        title: "24/7 Concierge",
        description: "Real humans, ready to help you anytime, day or night."
    },
    {
        icon: <CreditCard className="w-8 h-8 text-[#00ff88]" />,
        title: "Virtual Cards",
        description: "Generate disposable virtual cards for secure one-time online payments."
    }
];

const BankFeatures = () => {
    return (
        <section className="min-h-screen relative py-32 px-6 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#0a0a0a] z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,136,0.1),transparent_70%)] opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00ff88]/10 blur-[100px] rounded-full"></div>
                <div className="absolute inset-0 backdrop-blur-[2px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter text-white drop-shadow-md">
                        Banking Reimagined.
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-sm font-medium">
                        We stripped away the friction to reveal the pure physics of finance.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <GlassCard className="h-full bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#00ff88]/50 hover:bg-black/60 transition-all duration-300 group cursor-pointer shadow-lg hover:shadow-[#00ff88]/10">
                                <div className="mb-6 p-4 rounded-full bg-[#00ff88]/10 w-fit group-hover:scale-110 transition-transform group-hover:bg-[#00ff88]/20">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-[#00ff88] transition-colors">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-200">
                                    {feature.description}
                                </p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default BankFeatures;
