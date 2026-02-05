'use client';

import React from 'react';
import { cn } from '@/lib/utils'; // We need this utility

const GlassCard = ({ children, className }) => {
    return (
        <div className={`glass rounded-2xl p-6 relative overflow-hidden ${className}`}>
            {/* Optional: Add shine effect/noise here */}
            <div className="absolute inset-0 bg-white/5 opacity-50 pointer-events-none" />
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default GlassCard;
