'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const processingStages = [
    {
        id: 1,
        text: 'Validating your details',
        duration: 2000,
    },
    {
        id: 2,
        text: 'Verifying PAN & Aadhar with government database',
        duration: 3000,
    },
    {
        id: 3,
        text: 'Generating unique 10-digit account number',
        duration: 2000,
    },
    {
        id: 4,
        text: 'Creating your debit card',
        duration: 2000,
    },
    {
        id: 5,
        text: 'Setting up online banking credentials',
        duration: 1500,
    },
    {
        id: 6,
        text: 'Sending confirmation email',
        duration: 1000,
    }
];

const ProcessingAnimation = ({ onComplete }) => {
    const [currentStage, setCurrentStage] = useState(0);

    useEffect(() => {
        if (currentStage >= processingStages.length) {
            if (onComplete) onComplete();
            return;
        }

        const timer = setTimeout(() => {
            setCurrentStage(prev => prev + 1);
        }, processingStages[currentStage].duration);

        return () => clearTimeout(timer);
    }, [currentStage, onComplete]);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="mb-12 flex justify-center">
                <div className="relative w-24 h-24">
                    <motion.div
                        className="absolute inset-0 border-4 border-[#00ff88]/30 rounded-full"
                    />
                    <motion.div
                        className="absolute inset-0 border-4 border-[#00ff88] border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center text-4xl">
                        <i className="ri-bank-line"></i>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {processingStages.map((stage, idx) => {
                    const isCompleted = idx < currentStage;
                    const isCurrent = idx === currentStage;
                    const isPending = idx > currentStage;

                    return (
                        <motion.div
                            key={stage.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${isCurrent ? 'bg-white/10 border border-[#00ff88]/30' : 'bg-transparent'
                                }`}
                        >
                            <div className="min-w-[24px]">
                                {isCompleted ? (
                                    <span className="text-[#00ff88] text-lg">✓</span>
                                ) : isCurrent ? (
                                    <motion.span
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="block w-4 h-4 border-2 border-[#00ff88] border-t-transparent rounded-full"
                                    />
                                ) : (
                                    <span className="w-4 h-4 rounded-full border-2 border-white/10 block" />
                                )}
                            </div>

                            <span className={`text-sm ${isCompleted ? 'text-white/40 line-through' :
                                isCurrent ? 'text-white font-medium' :
                                    'text-white/20'
                                }`}>
                                {stage.text}
                            </span>
                        </motion.div>
                    );
                })}
            </div>

            <p className="text-center text-white/40 text-xs mt-8 animate-pulse">
                Please wait, do not close this window...
            </p>
        </div>
    );
};

export default ProcessingAnimation;
