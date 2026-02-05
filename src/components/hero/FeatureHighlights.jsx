'use client';

import React from 'react';
import { motion } from 'framer-motion';

const FeatureHighlights = ({ features }) => {
    return (
        <div className="mt-8 relative p-6">
            {/* Animated Border Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <motion.rect
                    width="100%"
                    height="100%"
                    rx="20"
                    fill="none"
                    stroke="#00ff88"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                />
            </svg>

            <div className="space-y-3 relative z-10">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + (idx * 0.2) }}
                        className="flex items-center gap-3 text-white/90"
                    >
                        <div className="w-5 h-5 rounded-full bg-[#00ff88]/20 flex items-center justify-center text-[#00ff88] text-xs">✓</div>
                        <span className="font-medium tracking-wide">{feature}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default FeatureHighlights;
