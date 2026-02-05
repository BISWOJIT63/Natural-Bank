'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FramePreloader = ({ progress, isLoaded }) => {
    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-8"
                    >
                        <h1 className="text-4xl font-bold tracking-tighter">NATURAL BANK</h1>
                    </motion.div>

                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#00ff88]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.2 }}
                        />
                    </div>
                    <div className="mt-4 font-mono text-xs text-[#00ff88]">
                        LOADING RESOURCES... {Math.round(progress)}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FramePreloader;
