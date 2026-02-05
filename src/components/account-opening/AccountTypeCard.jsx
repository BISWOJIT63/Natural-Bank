'use client';

import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';

const AccountTypeCard = ({ type, onSelect }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="h-full"
        >
            <GlassCard className="h-full flex flex-col hover:border-[#00ff88]/50 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00ff88]/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-[#00ff88]/10" />

                <div className="mb-6 flex justify-between items-start">
                    <span className="text-4xl">{type.icon}</span>
                    <button
                        onClick={() => onSelect(type.id)}
                        className="px-4 py-2 rounded-full border border-[#00ff88]/20 text-[#00ff88] text-sm font-medium hover:bg-[#00ff88] hover:text-black transition-all"
                    >
                        Choose {type.name.split(' ')[0]}
                    </button>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">{type.name}</h3>
                <p className="text-white/60 mb-6 min-h-[48px]">{type.description}</p>

                <div className="space-y-6 flex-grow">
                    <div>
                        <h4 className="text-sm font-semibold text-[#00ff88] mb-3 uppercase tracking-wider">Features</h4>
                        <ul className="space-y-2">
                            {type.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-white/80">
                                    <span className="text-[#00ff88] mt-1">✓</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white/40 mb-3 uppercase tracking-wider">Eligibility</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-sm text-white/60">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                Age: {type.eligibility.ageMin}-{type.eligibility.ageMax} years
                            </li>
                            {type.eligibility.required.slice(0, 3).map((req, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-white/60">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5" />
                                    {req}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <button
                        onClick={() => onSelect(type.id)}
                        className="w-full py-4 bg-white/5 hover:bg-[#00ff88] hover:text-black text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                    >
                        Application for {type.name}
                    </button>
                </div>
            </GlassCard>
        </motion.div>
    );
};

export default AccountTypeCard;
